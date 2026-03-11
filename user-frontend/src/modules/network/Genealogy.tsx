import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { getDownlineApi } from "../../api/genealogy.api";
import { MinusIcon, PlusIcon, SearchIcon } from "../../assets/Icons";
import PageHeader from "../../components/common/PageHeader";
import designConfig from "../../config/designConfig";
import { useUserProfile } from "../../hooks/profile/useProfile";

// COLORS
const GREEN_LOGGED_IN = designConfig.colors.primary.main;
const YELLOW_REFERRED = designConfig.colors.warning.main;

// ---------------------------------------
// TYPES
// ---------------------------------------

interface TreeNodeType {
  id: string;
  name: string;
  isReferred: boolean;
  left?: TreeNodeType | null;
  right?: TreeNodeType | null;
  loaded?: boolean;
  loading?: boolean;
}

interface TreeNodeProps {
  node: TreeNodeType;
  expanded: Set<string>;
  onToggle: (node: TreeNodeType) => void;
  level?: number;
}

// ---------------------------------------
// AUTO SHRINK
// ---------------------------------------

const getResponsiveSize = (level: number) => {
  const scale = Math.max(0.5, 1 - level * 0.06);

  return {
    scale,
    cardPadding: `${25 * scale}px ${25 * scale}px`,
    avatar: `${40 * scale}px`,
    nameSize: `${14 * scale}px`,
    idSize: `${10 * scale}px`,
    gap: `${6 * scale}px`,
  };
};

// ---------------------------------------
// TREE NODE
// ---------------------------------------

const TreeNode = ({ node, expanded, onToggle, level = 0 }: TreeNodeProps) => {
  if (!node) return null;

  const isExpanded = expanded.has(node.id);
  const size = getResponsiveSize(level);

  const bgColor = node.isReferred ? YELLOW_REFERRED : GREEN_LOGGED_IN;

  return (
    <div className="flex flex-col items-center">

      {level > 0 && <div className="w-px h-6 bg-slate-300 mb-2" />}

      {/* CARD */}
      <div
        className="relative rounded-xl border border-white/80 shadow-xl cursor-pointer transition-all group"
        style={{
          background: `linear-gradient(135deg, ${bgColor}, ${bgColor}cc)`,
          padding: size.cardPadding,
          transform: `scale(${size.scale})`,
          boxShadow: designConfig.shadows.md
        }}
        onClick={() => onToggle(node)}
      >

        <div className="flex items-center" style={{ gap: size.gap }}>

          <div
            className="rounded-full flex items-center justify-center font-bold text-white shadow-md"
            style={{
              width: size.avatar,
              height: size.avatar,
              backgroundColor: "rgba(255,255,255,0.2)",
              border: "1px solid white",
            }}
          >
            {node.name.charAt(0)}
          </div>

          <div className="min-w-0 flex-1 text-white">
            <p className="font-semibold truncate" style={{ fontSize: size.nameSize }}>
              {node.name}
            </p>

            <p className="font-mono text-white/90 truncate" style={{ fontSize: size.idSize }}>
              ID: {node.id}
            </p>

            {node.loading && (
              <p className="text-xs text-white/80 mt-1">Loading...</p>
            )}
          </div>

        </div>

        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          {isExpanded ? (
            <ChevronUp className="h-4" style={{ color: bgColor }} />
          ) : (
            <ChevronDown className="h-4" style={{ color: bgColor }} />
          )}
        </div>

      </div>

      {/* CHILDREN */}
      {isExpanded && (node.left || node.right) && (
        <div className="mt-6">

          <div className="flex justify-center">
            <div className="w-px h-6 bg-slate-300" />
          </div>

          <div className="relative mt-1 flex items-start justify-center">

            <div className="absolute top-0 left-20 right-20 h-px bg-slate-300" />

            {/* LEFT */}
            <div className="flex flex-col items-center mr-10">

              {node.left && (
                <>
                  <div className="w-px h-5 bg-slate-300" />

                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] text-white font-bold"
                    style={{ backgroundColor: designConfig.colors.info.main }}
                  >
                    LEFT
                  </span>

                  <TreeNode
                    node={node.left}
                    expanded={expanded}
                    onToggle={onToggle}
                    level={level + 1}
                  />
                </>
              )}

            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-center ml-10">

              {node.right && (
                <>
                  <div className="w-px h-5 bg-slate-300" />

                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] text-white font-bold"
                    style={{ backgroundColor: designConfig.colors.secondary.main }}
                  >
                    RIGHT
                  </span>

                  <TreeNode
                    node={node.right}
                    expanded={expanded}
                    onToggle={onToggle}
                    level={level + 1}
                  />
                </>
              )}

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

// ---------------------------------------
// MAIN COMPONENT
// ---------------------------------------

export default function ReferralTree() {

  const { data, isLoading, isError } = useUserProfile();

  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [zoom, setZoom] = useState(1);
  const [treeData, setTreeData] = useState<Record<string, TreeNodeType>>({});

  const toggleNode = async (node: TreeNodeType) => {

    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(node.id) ? next.delete(node.id) : next.add(node.id);
      return next;
    });

    if (treeData[node.id]?.loaded) return;

    try {

      const res = await getDownlineApi();

      const users = res?.data || [];

      const leftUser = users.find((u: any) => u.legPosition === "LEFT");
      const rightUser = users.find((u: any) => u.legPosition === "RIGHT");

      const left = leftUser
        ? {
          id: leftUser.memberId,
          name: `${leftUser.firstName} ${leftUser.lastName}`,
          isReferred: true
        }
        : null;

      const right = rightUser
        ? {
          id: rightUser.memberId,
          name: `${rightUser.firstName} ${rightUser.lastName}`,
          isReferred: true
        }
        : null;

      setTreeData((prev) => ({
        ...prev,
        [node.id]: {
          ...node,
          left,
          right,
          loaded: true
        },
      }));

    } catch (err) {
      console.error("Failed to load downline", err);
    }
  };
  if (isLoading) return <div className="p-6">Loading profile...</div>;
  if (isError || !data?.data) return <div className="p-6 text-red-500">Failed to load profile</div>;

  const rootUser: TreeNodeType = treeData[data.data.memberId] || {
    id: data.data.memberId,
    name: `${data.data.firstName} ${data.data.lastName}`,
    isReferred: false
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: designConfig.colors.background.light }}
    >

      <PageHeader title="Genealogy" />

      <div className="p-6">

        {/* TOOLBAR */}
        <div className="flex items-center gap-4 mb-4">

          <div className="flex items-center border rounded-lg px-3 py-2 w-64 shadow-sm bg-white">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search By ID or Name"
              className="ml-2 flex-1 outline-none text-sm"
            />
          </div>

          <button onClick={() => setZoom(z => Math.min(2, z + 0.1))}>
            <PlusIcon />
          </button>

          <button onClick={() => setZoom(z => Math.max(0.3, z - 0.1))}>
            <MinusIcon />
          </button>

          <button
            onClick={() => setZoom(1)}
            className="px-4 py-1 text-white rounded-lg text-sm font-bold shadow-md"
            style={{ backgroundColor: designConfig.colors.text.primary }}
          >
            Reset
          </button>

        </div>

        {/* TREE AREA */}
        <div
          className="flex justify-center overflow-auto border p-6 rounded-xl shadow-inner bg-white"
          style={{ height: "70vh" }}
        >

          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top center",
              transition: "0.15s ease-out"
            }}
          >
            <TreeNode
              node={rootUser}
              expanded={expanded}
              onToggle={toggleNode}
            />
          </div>

        </div>

      </div>

    </div>
  );
}