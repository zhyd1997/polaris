import React from 'react';

interface Props {
    children: React.ReactElement;
    target: string;
}

export function Step({children}: Props) {
    return <>{children}</>
}
