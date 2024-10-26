import Avatar from "@mui/material/Avatar";

interface Props {
    src: string
    avatar?: boolean
    alt?: string
}

const IMAGE_DOMAIN = import.meta.env.VITE_DOMAIN_MEDIA;

const Image = ({ src, avatar, alt }: Props) => {
    const ss = `${IMAGE_DOMAIN}/${src}`;

    return (
        avatar
            ? <Avatar
                alt={alt}
                src={ss}
                sx={{ width: 25, height: 25 }}
            />
            : <img src={ss} alt={alt} />
    );
};

export default Image;
