import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import DialogContent from "@mui/material/DialogContent";

import Property from "@entities/property/ui/Property";
import PropertyDeleteButton from "@features/property/ui/PropertyDeleteButton";
import { usePropertyGroup } from "@entities/propertyGroup/api/hooks";
import SelectedGroupContext from "@features/propertyGroup/lib/selectedGroup";
import PropertyCreate from '@features/property/ui/PropertyCreate';
import PropertyGroupModel from "@entities/propertyGroup/model/PropertyGroup";

const PropertyList = () => {
    const selectedGroup = useContext(SelectedGroupContext);
    const { data, isFetching } = usePropertyGroup(selectedGroup, Boolean(selectedGroup));
    const [isNewPropertyOpen, setIsNewPropertyOpen] = useState<boolean>(false);

    return (
        <>
            <div className="flex items-center flex-col gap-6 p-2 mt-20 min-w-96">
                {isFetching ? <CircularProgress /> :
                    data && (
                        <div>
                            <Typography className="flex items-baseline justify-center">
                                <b>&nbsp;{data?.alt_name}&nbsp;</b> group properties
                            </Typography>
                            {data.properties.length ? (
                                <TableContainer component={Paper}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 700 }} align="left">Id</TableCell>
                                                <TableCell sx={{ fontWeight: 700 }} align="left">Tools</TableCell>
                                                <TableCell sx={{ fontWeight: 700 }} align="left">Alt name</TableCell>
                                                <TableCell sx={{ fontWeight: 700 }} align="left">Titles</TableCell>
                                                <TableCell sx={{ fontWeight: 700 }} align="left">Comment</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data?.properties.map(i => (
                                                <Property
                                                    property={i}
                                                    renderTools={() => <PropertyDeleteButton groupId={data.id} property={i} />}
                                                    key={i.id}
                                                />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : <Typography align="center">List is empty</Typography>}
                        </div>
                    )
                }
                <div className="flex justify-center gap-1">
                    <Button variant="contained" onClick={() => setIsNewPropertyOpen(true)}>Add</Button>
                </div>
            </div>
            <Dialog
                open={isNewPropertyOpen}
                onClose={() => setIsNewPropertyOpen(false)}
                PaperComponent={Paper}
            >
                <DialogTitle className="flex items-baseline justify-center">
                    Create new property for<b>&nbsp;{data?.alt_name}&nbsp;</b>group
                </DialogTitle>
                <DialogContent>
                    <PropertyCreate
                        groupId={data?.id as PropertyGroupModel['id']}
                        handleClose={() => setIsNewPropertyOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PropertyList;
