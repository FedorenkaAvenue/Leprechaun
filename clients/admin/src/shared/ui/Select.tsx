
import {
    Box, Chip, Select as SelectMui, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput,
    SelectProps,
} from '@mui/material';
import { forwardRef } from 'react';

import { Option } from '@shared/models/interfaces';

export type CustomSelectProps = {
    options: Option[] | undefined
    isLoading?: boolean
    error?: string
} & Omit<SelectProps<any>, 'error'>;

const Select = forwardRef(({
    options, isLoading, error, disabled, ...props
}: CustomSelectProps, ref) => {
    const isEmptyList = !options?.length;

    return (
        <FormControl sx={{ m: 1, width: 300, margin: 0 }} error={Boolean(error)} disabled={isEmptyList || disabled}>
            {props.label && <InputLabel id={props.name}>{props.label}</InputLabel>}
            <SelectMui
                disabled={isEmptyList || disabled}
                ref={ref}
                input={props.label ? <OutlinedInput label="Chip" /> : undefined}
                renderValue={(selected) => {
                    switch (true) {
                        case isLoading:
                            return <CircularProgress size="20px" />;
                        case !props.multiple:
                            return <div>{options?.find(i => i.id === props.value)?.title}</div>;
                        default:
                            const mapedSelected = (selected as number[]).map(i => options?.find(o => i === o.id));

                            return (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {mapedSelected.map((i) => (
                                        <Chip key={i?.id} label={i?.title} />
                                    ))}
                                </Box>
                            );
                    }
                }}
                {...props}
            >
                {options?.map(({ id, title }) => (
                    <MenuItem key={id} value={id}>{title}</MenuItem>
                ))}
            </SelectMui>
            {error && <FormHelperText>{error}</FormHelperText>}
            {isEmptyList && <FormHelperText>List is empty</FormHelperText>}
        </FormControl>
    );
});

Select.displayName = 'CustomSelect';

export default Select;
