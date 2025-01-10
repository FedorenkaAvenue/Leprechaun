'use client';

import { Copy, Share2 } from "lucide-react";
import { FC } from "react";

import { useI18n } from "@shared/lib/i18n_client";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Button } from "./primitives/ui/button";
import { Input } from "./primitives/ui/input";
import { Label } from "./primitives/ui/label";
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "./primitives/ui/dialog";

interface Props {
    link: string
}

const Share: FC<Props> = ({ link }) => {
    const [val, copy] = useCopyToClipboard();
    const { dictionary, lang } = useI18n();

    const href = `${window.location.origin}/${lang}/${link}`;

    return (
        <Dialog>
            <DialogTrigger asChild><Share2 /></DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{dictionary?.share.share}</DialogTitle>
                    {!val && <DialogDescription>{dictionary?.share.shareDescription}</DialogDescription>}
                </DialogHeader>
                {val
                    ? <div>{dictionary?.share.linkCopied}</div>
                    : (
                        <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">{dictionary?.common.link}</Label>
                                <Input id="link" defaultValue={href} readOnly />
                            </div>
                            <Button onClick={() => copy(href)} type="submit" size="sm" className="px-3">
                                <Copy />
                            </Button>
                        </div>
                    )
                }
            </DialogContent>
        </Dialog>
    );
};

export default Share;
