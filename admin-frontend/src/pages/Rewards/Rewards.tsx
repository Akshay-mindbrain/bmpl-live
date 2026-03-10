import {
    Box,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    CircularProgress
} from "@mui/material";
import { useRewards } from "../../hooks/Rewards/useRewards";

function Rewards() {

    const { data: rewards = [], isLoading } = useRewards();

    return (
        <Box>
            <Typography variant="h5" fontWeight={600} mb={2}>
                Rewards History
            </Typography>

            <Paper elevation={2}>
                {isLoading ? (
                    <Box display="flex" justifyContent="center" p={3}>
                        <CircularProgress size={28} />
                    </Box>
                ) : (
                    <Table sx={{ minWidth: 700 }}>
                        <TableHead>
                            <TableRow sx={{ background: "#f5f5f5" }}>
                                <TableCell sx={{ fontWeight: 600, fontSize: 16 }}>User ID</TableCell>
                                <TableCell sx={{ fontWeight: 600, fontSize: 16 }}>Reward</TableCell>
                                <TableCell sx={{ fontWeight: 600, fontSize: 16 }}>Matched BV</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rewards.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        No rewards available
                                    </TableCell>
                                </TableRow>
                            ) : (
                                rewards.map((reward: any) => (
                                    <TableRow
                                        key={reward.id}
                                        sx={{ "&:hover": { background: "#fafafa" } }}
                                    >
                                        <TableCell sx={{ fontSize: 15 }}>{reward.userId}</TableCell>
                                        <TableCell sx={{ fontSize: 15 }}>{reward.giftName}</TableCell>
                                        <TableCell sx={{ fontSize: 15 }}>{reward.matchedBV}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>

                    </Table>
                )}
            </Paper>
        </Box>
    );
}

export default Rewards;