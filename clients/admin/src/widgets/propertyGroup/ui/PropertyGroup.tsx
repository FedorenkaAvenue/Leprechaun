import { useParams } from "react-router-dom";
import { Button, Dialog, DialogContent, DialogTitle, Divider, Paper, Typography } from "@mui/material";
import { useState } from "react";

import { usePropertyGroup } from "@entities/propertyGroup/api/hooks";
import PropertyGroupEntity from "@entities/propertyGroup/ui/PropertyGroup";
import ContentManager from "@shared/ui/ContentManager";
import PropertyGroupDeleteButton from "@features/propertyGroup/ui/PropertyGroupDeleteButton";
import PropertyCreate from "@features/property/ui/PropertyCreate";
import PropertyGroupPreviewModel from "@entities/propertyGroup/model/PropertyGroup";
import PropertyDeleteButton from "@features/property/ui/PropertyDeleteButton";
import Chip from "@shared/ui/Chip";
import TransList from "@shared/ui/TransList";
import routerSubConfig from "@shared/config/router";
import PropertyTableFuture from "@features/property/ui/PropertyTable";
import EditButton from "@shared/ui/EditButton";
import Empty from "@shared/ui/Empty";

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
                    <PropertyGroupEntity
                        group={data}
                        renderCategories={categories => (
                            <>
                                <Divider />
                                <div className="flex flex-col gap-2">
                                    <Typography variant="h5">Used by categories</Typography>
                                    <Empty data={categories?.length}>
                                        <ul className="flex gap-2">
                                            {categories?.map(i => (
                                                <li key={i.id}>
                                                    <Chip
                                                        tooltip={<TransList data={i.title} />}
                                                        link={`${routerSubConfig.categoryList.path}/${i.url}`}
                                                        label={i.url}
                                                        tooltipProps={{ placement: 'bottom' }}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </Empty>
                                </div>
                            </>
                        )}
                        renderProperties={properties => (
                            <>
                                <Divider />
                                <div className="flex flex-col gap-4">
                                    <Typography variant="h5">Properties</Typography>
                                    <PropertyTableFuture
                                        properties={properties}
                                        renderPropertyTools={property => (
                                            <>
                                                <PropertyDeleteButton groupId={data?.id} property={property} />
                                                <EditButton handleClick={() => alert("Хуя")} title="Edit property group" />
                                            </>
                                        )}
                                    />
                                </div>
                            </>
                        )}
                    />
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
                        groupId={data?.id as PropertyGroupPreviewModel['id']}
                        handleClose={() => setIsNewPropertyOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PropertyGroupWidget;
