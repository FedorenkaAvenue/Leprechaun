import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import {
    Button, FormControl, FormControlLabel, Slider, Step, StepConnector, StepLabel, Stepper, Switch, Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import CategorySelectList from "@features/category/ui/CategorySelectList";
import PropertySelectList from "@features/property/ui/PropertySelectList";
import useMultiSelectOptions from "@shared/lib/useMultiSelectOptions";
import LinearLoader from "@shared/ui/LinearLoader";
import FileUploader, { FileUploaderFile } from "@shared/ui/FileUploader";
import { productSchemaBySteps, ProductSchema } from "@features/product/model/schema";
import TextInput from "@shared/ui/TextInput";
import Select from "@shared/ui/Select";
import productStatusOptions from "@entities/product/constants/productStatusOptions";
import Empty from "@shared/ui/Empty";
import useQueryParam from "@shared/lib/useQueryParam";
import { PRODUCT_CREATE_URL_QUERY_PARAMS } from "@features/product/constants/urlQueryParams";
import { useCategoryList } from "@entities/category/model/hooks";
import { usePropertyGroupListByCategoryId } from "@entities/propertyGroup/model/hooks";
import { ProductStatus } from "@entities/product/model/enums";
import { useCreateProduct } from "@features/product/model/hook";

const STEPS = ["Main info", "Properties", "Images"];

function Step1() {
    const { register, getValues, formState: { errors }, watch } = useFormContext<ProductSchema>();

    watch('status');

    return (
        <div className="flex flex-col gap-4">
            <div>
                <Typography>Title</Typography>
                <div className="flex gap-2">
                    <TextInput {...register('title.en')} r label="en" error={errors.title?.en?.message} />
                    <TextInput {...register('title.ru')} r label="ru" error={errors.title?.ru?.message} />
                    <TextInput {...register('title.ua')} r label="ua" error={errors.title?.ua?.message} />
                </div>
            </div>
            <div>
                <Typography>Description</Typography>
                <div className="flex gap-2">
                    <TextInput {...register('description.en')} r multiline label="en" error={errors.description?.en?.message} />
                    <TextInput {...register('description.ru')} r multiline label="ru" error={errors.description?.ru?.message} />
                    <TextInput {...register('description.ua')} r multiline label="ua" error={errors.description?.ua?.message} />
                </div>
            </div>
            <div>
                <Typography>Price</Typography>
                <div className="flex gap-2">
                    <TextInput {...register('price_current')} type='number' r label="current" error={errors.price_current?.message} />
                    <TextInput {...register('price_old')} type='number' label="old" error={errors.price_old?.message} />
                </div>
            </div>
            <FormControl sx={{ flexDirection: 'row' }}>
                <FormControlLabel control={
                    <Switch {...register('is_public')} defaultChecked={true} />
                }
                    label="public" />
                <FormControlLabel control={
                    <Switch {...register('is_new')} defaultChecked={true} />
                }
                    label="new" />
                <Select {...register('status')} value={getValues('status')} options={productStatusOptions} />
            </FormControl>
            <div>
                <Typography>Rating</Typography>
                <Slider
                    {...register('rating')}
                    className="max-w-60"
                    defaultValue={50}
                    aria-label="Rating"
                    valueLabelDisplay="auto"
                    max={100}
                    min={0}
                />
            </div>
            <TextInput {...register('comment')} label="Comment" />
        </div>
    );
}

function Step2() {
    const { register, getValues, formState: { errors }, watch, setValue } = useFormContext<ProductSchema>();
    const selectedCategoryValue = getValues('category');
    const { data: categoryList, isFetching: categoryListIstFetching } = useCategoryList();
    const selectedCategory = categoryList?.find(i => i.id === selectedCategoryValue);
    const {
        data: propGroupList, isFetching: propertyGroupListIsFetching,
    } = usePropertyGroupListByCategoryId(selectedCategory?.id, { skip: !selectedCategory });
    const { handleUpdataValues, values, selectedValues, clear } = useMultiSelectOptions();

    useEffect(() => {
        setValue('properties', values as number[]);
    }, [values]);

    useEffect(clear, [selectedCategoryValue]);

    watch('category');

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center">
                <Typography variant='h5'>Select category</Typography>
                <CategorySelectList
                    {...register('category', { required: true })}
                    value={selectedCategoryValue}
                    error={errors.category?.message}
                />
            </div>
            <LinearLoader isLoading={categoryListIstFetching || propertyGroupListIsFetching} />
            {selectedCategoryValue && (
                <div className="flex flex-col items-center">
                    <Empty data={propGroupList?.length}>
                        <Typography variant='h5'>Select properties (optional)</Typography>
                        <ul className="flex flex-wrap gap-2">
                            {propGroupList?.map(i => (
                                <li key={i.id}>
                                    <Typography>{i.title.en}</Typography>
                                    <PropertySelectList
                                        onChange={({ target: { value } }) => handleUpdataValues(i.id, value)}
                                        propertyGroup={i}
                                        //@ts-ignore
                                        value={selectedValues[i.id] || []}
                                    />
                                </li>
                            ))}
                        </ul>
                    </Empty>
                </div>
            )}
        </div>
    );
}

function Step3() {
    const { getValues, formState: { errors }, setValue } = useFormContext<ProductSchema>();

    function change(images: FileUploaderFile[] | FileUploaderFile) {
        setValue('images', images as FileUploaderFile[]);
    }

    return (
        <FileUploader
            value={getValues('images')}
            onChange={change}
            error={errors.images?.message as string}
            allowMultiple
            name="images"
            labelIdle={`Drag & Drop product images or <span class="filepond--label-action">Browse</span>`}
        />
    );
}

const ProductCreatePage = () => {
    const [params] = useQueryParam<keyof typeof PRODUCT_CREATE_URL_QUERY_PARAMS>(['category']);
    const nav = useNavigate();
    const [mutate, { isLoading }] = useCreateProduct();
    const [activeStep, setActiveStep] = useState<number>(0);
    const formMethods = useForm<ProductSchema>({
        resolver: zodResolver(productSchemaBySteps[(activeStep > productSchemaBySteps.length - 1) ? 0 : activeStep]),
        defaultValues: {
            status: ProductStatus.AVAILABLE,
            category: params.category ? Number(params.category) : undefined,
        }
    });

    async function handleNext() {
        const isStepValid = await formMethods.trigger();

        if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    function handleBack() {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function onSubmit() {
        mutate({ newProduct: formMethods.getValues(), successCallback: () => nav(-1) });
    };

    return (
        <div className="flex flex-col gap-4">
            <Stepper activeStep={activeStep} connector={<StepConnector />}>
                {STEPS.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <LinearLoader isLoading={isLoading} />
            <FormProvider {...formMethods}>
                <form className="flex flex-col gap-8">
                    {activeStep === 0 && <Step1 />}
                    {activeStep === 1 && <Step2 />}
                    {activeStep === 2 && <Step3 />}
                    <div className="flex justify-center fixed bottom-4 left-2/4">
                        <Button disabled={activeStep === 0} onClick={handleBack}>
                            Back
                        </Button>
                        {activeStep === STEPS.length - 1
                            ? (
                                <Button variant="contained" color="primary" onClick={formMethods.handleSubmit(onSubmit)}>
                                    Submit
                                </Button>
                            )
                            : (
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    Next
                                </Button>
                            )
                        }
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default ProductCreatePage;
