import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import LoadingButton from '@mui/lab/LoadingButton';
import { SubmitHandler, useForm } from "react-hook-form";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";

import { usePropertyGroupList } from "@entities/propertyGroup/api/hooks";
import mapToOptions from "@entities/propertyGroup/lib/mapToOptions";
import routerSubConfig from "@shared/config/router";
import Select from "@shared/ui/Select";
import { useCreateCategory } from "@features/category/api/hooks";
import { CategoryCreateDTO } from "@features/category/model/dto";

const CategoryCreate = () => {
    const nav = useNavigate();
    const { data: propGroups } = usePropertyGroupList();
    const { register, handleSubmit, getValues, watch } = useForm<CategoryCreateDTO>();
    const { mutate, isPending } = useCreateCategory(() => nav(routerSubConfig.categoryList.path));
    const sendForm: SubmitHandler<CategoryCreateDTO> = data => {
        mutate(data);
    };

    watch();

    return (
        <form onSubmit={handleSubmit(sendForm)} className="flex gap-4 flex-col items-baseline">
            <TextField {...register('url')} required id="outlined-basic" label="url" variant="outlined" />
            <FormControl>
                <FormGroup>
                    <FormControlLabel control={
                        <Switch {...register('is_public')} />
                    }
                        label="public" />
                </FormGroup>
            </FormControl>
            <div>
                <FormLabel component="legend">Title</FormLabel>
                <div className="flex gap-1">
                    <TextField {...register('title.en')} required id="outlined-basic" label="eng" variant="outlined" />
                    <TextField {...register('title.ru')} required id="outlined-basic" label="ru" variant="outlined" />
                    <TextField {...register('title.ua')} required id="outlined-basic" label="ua" variant="outlined" />
                </div>
            </div>
            <TextField {...register('comment')} id="outlined-basic" label="comment" variant="outlined" />
            {/* <div>
                <FormLabel component="legend">Icon</FormLabel>
                <TextField {...register('icon')} required type="file" />
            </div> */}
            <Select
                {...register('propertygroups')}
                title='property groups'
                options={mapToOptions(propGroups || [])}
                value={getValues('propertygroups') || []}
            />
            <div className="w-full flex justify-center">
                <LoadingButton
                    type='submit'
                    loading={isPending}
                    loadingPosition="center"
                    variant="contained"
                >
                    Save
                </LoadingButton>
            </div>
        </form >
    );
};

export default CategoryCreate;
