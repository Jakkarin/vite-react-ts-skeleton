import { PropsWithChildren } from "react";
import { Link as LinkInner } from "react-router-dom";

export const Link = function (props: PropsWithChildren<{ to?: any; }>) {
    const pathname = props?.to?.path ?? '';

    if (!pathname) {
        <>{props.children}</>
    }

    return <LinkInner to={pathname}>{props.children}</LinkInner>;
};

export default Link;