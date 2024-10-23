import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SelectMui, { SelectProps } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { forwardRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';

import OptionModel from '@shared/models/Option';

export type CustomSelectProps = {
    options: OptionModel[] | undefined
    isLoading?: boolean
    error?: string
} & Omit<SelectProps<any>, 'error'>;

const Select = forwardRef(({
    options, isLoading, error, disabled, ...props
}: CustomSelectProps, ref) => {
    const isEmptyList = !options?.length;

    return (
        <FormControl sx={{ m: 1, width: 300 }} error={Boolean(error)} disabled={isEmptyList || disabled}>
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
                {options?.map(i => (
                    <MenuItem key={i.id} value={i.id}>{i.title}</MenuItem>
                ))}
            </SelectMui>
            {error && <FormHelperText>{error}</FormHelperText>}
            {isEmptyList && <FormHelperText>List is empty</FormHelperText>}
        </FormControl>
    );
});

Select.displayName = 'CustomSelect';

export default Select;
