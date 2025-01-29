import { useParams } from "react-router";
import { Button, Dialog, DialogContent, DialogTitle, Divider, Paper, Typography } from "@mui/material";
import { useState } from "react";

import PropertyGroupEntity from "@entities/propertyGroup/ui/PropertyGroup";
import ContentManager from "@shared/ui/ContentManager";
import PropertyGroupDeleteButton from "@features/propertyGroup/ui/PropertyGroupDeleteButton";
import Chip from "@shared/ui/Chip";
import TransList from "@shared/ui/TransList";
import routerSubConfig from "@shared/config/router";
import Empty from "@shared/ui/Empty";
import PropertyTableWidget from "@widgets/property/ui/PropertyTable";
import PropertyCreateWidget from "@widgets/property/ui/PropertyCreate";
import { usePropertyGroup } from "@entities/propertyGroup/model/hooks";
import { PropertyGroupPreview } from "@entities/propertyGroup/model/interfaces";

const PropertyGroupPage = () => {
    const { id } = useParams();
    const { data, isFetching } = usePropertyGroup(Number(id));
    const [isNewPropertyOpen, setIsNewPropertyOpen] = useState<boolean>(false);

    if (isFetching || !data) return <div>loading</div>;

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
                                    <PropertyTableWidget
                                        properties={properties}
                                        group={data}
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
                    <PropertyCreateWidget
                        groupId={data?.id as PropertyGroupPreview['id']}
                        handleClose={() => setIsNewPropertyOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PropertyGroupPage;
