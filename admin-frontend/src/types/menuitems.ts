export type MenuItem = {
  type: "item";
  name: string;
  path: string;
  icon: React.ReactNode;
};

export type MenuDropdown = {
  type: "dropdown";
  name: string;
  icon: React.ReactNode;
  basePath: string;
  children: {
    name: string;
    path: string;
  }[];
};