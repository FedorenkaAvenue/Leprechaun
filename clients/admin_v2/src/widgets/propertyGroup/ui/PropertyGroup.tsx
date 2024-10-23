import { useParams } from "react-router-dom";
import { usePropertyGroup } from "@entities/propertyGroup/api/hooks";
import PropertyGroupEntity from "@entities/propertyGroup/ui/PropertyGroup";
import ContentManager from "@shared/ui/ContentManager";
import PropertyGroupDeleteButton from "@features/propertyGroup/ui/PropertyGroupDeleteButton";
import Button from "@mui/material/Button";
import {
    Dialog, DialogContent, DialogTitle, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography,
} from "@mui/material";
import { useState } from "react";
import PropertyCreate from "@features/property/ui/PropertyCreate";
import PropertyGroupModel from "@entities/propertyGroup/model/PropertyGroup";
import Property from "@entities/property/ui/Property";
import PropertyDeleteButton from "@features/property/ui/PropertyDeleteButton";

const PropertyGroupWidget = () => {
    const { id } = useParams();
    const { data, isFetching } = usePropertyGroup(Number(id));
    const [isNewPropertyOpen, setIsNewPropertyOpen] = useState<boolean>(false);

    return (
        <>
            <ContentManager
                isLoading={isFetching}
                tools={
                    <>
                        <Button variant="contained" onClick={() => setIsNewPropertyOpen(true)}>Add Property</Button>
                        <Button onClick={() => alert("Хуя")} color='primary' variant='contained'>
                            Edit group
                        </Button>
                        <PropertyGroupDeleteButton withoutIcon group={data} />
                    </>
                }
            >
                <div className="flex flex-col gap-4">
                    <PropertyGroupEntity group={data} />
                    <Divider />
                    <div className="flex flex-col gap-4">
                        <Typography variant="h5">Properties</Typography>
                        {data?.properties.length ? (
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
                </div>
            </ContentManager>
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

export default PropertyGroupWidget;
