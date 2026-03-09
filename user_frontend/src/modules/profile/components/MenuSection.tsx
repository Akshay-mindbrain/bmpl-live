
import { Box, Paper, List, ListItemButton, ListItemText, Divider } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import designConfig from '../../../config/designConfig';
import { useNavigate } from "react-router-dom";
import React from "react";

interface MenuItem {
    icon: React.ReactNode;
    text: string;
    path: string;
    color: string;
}

interface MenuSectionProps {
    items: MenuItem[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({ items }: MenuSectionProps) => {
    const navigate = useNavigate();

    return (
        <Paper sx={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <List disablePadding>
                {items.map((item, index) => (
                    <Box key={index}>
                        <ListItemButton
                            onClick={() => item.path !== "#" && navigate(item.path)}
                            sx={{ py: 2, px: 3, "&:hover": { bgcolor: designConfig.colors.background.light } }}
                        >
                            <Box sx={{
                                p: 1,
                                borderRadius: "10px",
                                bgcolor: `${item.color}15`, // 15 is moderate opacity hex
                                color: item.color,
                                mr: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                {item.icon}
                            </Box>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{ variant: "body1", fontWeight: 600, color: designConfig.colors.text.primary }}
                            />
                            <ChevronRightIcon sx={{ color: "#e0e0e0" }} />
                        </ListItemButton>
                        {index < items.length - 1 && <Divider variant="inset" component="li" sx={{ ml: 9 }} />}
                    </Box>
                ))}
            </List>
        </Paper>
    );
};
