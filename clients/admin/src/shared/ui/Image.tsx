import Avatar from "@mui/material/Avatar";
import { forwardRef } from "react";
import { PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import clsx from 'clsx';

interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    src: string | undefined
    withSlider?: boolean
    thumbnail?: string
    avatar?: boolean
    withBorder?: boolean
}

const IMAGE_DOMAIN = import.meta.env.VITE_DOMAIN_MEDIA;

const Image = forwardRef<HTMLImageElement, Props>((
    { src, avatar, thumbnail, withBorder, withSlider, ...props },
    ref,
) => {
    const ss = `${IMAGE_DOMAIN}/${src}`;
    const img = (
        <img
            className={clsx(
                "cursor-pointer",
                { "border-2 border-gray-300": withBorder },
            )}
            src={thumbnail || ss}
            ref={ref}
            {...props}
        />
    );

    return (
        avatar
            ? <Avatar src={ss} sx={{ width: 25, height: 25 }} />
            : withSlider
                ? <PhotoView src={ss}>{img}</PhotoView>
                : img
    );
});

Image.displayName = 'Image';

export default Image;
