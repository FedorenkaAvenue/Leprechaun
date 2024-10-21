import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SelectMui, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import OptionModel from '@shared/models/Option';
import { forwardRef } from 'react';

interface Props {
    value: OptionModel['id'][]
    title: string
    options: OptionModel[] | undefined
    onChange: (e: SelectChangeEvent<OptionModel['id'][]>) => void
    name: string
}

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

const Select = forwardRef(({ title, options, onChange, value, name }: Props, ref) => {
    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id={title}>{title}</InputLabel>
            <SelectMui
                labelId={name}
                id={name}
                name={name}
                ref={ref}
                multiple
                value={value}
                onChange={onChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => {
                    const mapedSelected = selected.map(i => options?.find(o => i === o.id));

                    return (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {mapedSelected.map((i) => (
                                <Chip key={i?.id} label={i?.title} />
                            ))}
                        </Box>
                    )
                }}
            // MenuProps={MenuProps}
            >
                {options?.map(i => (
                    <MenuItem key={i.id} value={i.id}>{i.title}</MenuItem>
                ))}
            </SelectMui>
        </FormControl>
    );
});

export default Select;
