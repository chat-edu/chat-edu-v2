import React from 'react';

import {Text} from "@chakra-ui/react";

import NotebookLayout from "@/components/Notebook/NotebookLayout";
import Loading from "@/components/Utilities/Loading";

import useNotebook from "@/hooks/queries/notebooks/useNotebook";

import {Notebook as NotebookType} from "@/types/Notebook";

interface Props {
    notebookId: NotebookType["id"]
}

const Notebook: React.FC<Props> = ({ notebookId }) => {

    const { notebook, loading } = useNotebook(notebookId);

    return (
        <Loading loading={loading}>
            {
                notebook ? (
                    <NotebookLayout
                        notebook={notebook}
                    />
                ) : (
                    <Text>
                        Notebook not found
                    </Text>
                )
            }
        </Loading>
    )
};

export default Notebook;