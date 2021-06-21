import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    SimpleList,
    DeleteButton
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

const BlogTitle = ({ record }) => {
    return <span>Blog {record ? `"${record.title}"` : ''}</span>;
}

export const BlogList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => `${record.views} views`}
                    tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                />
            ) : (
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="title" />
                    <TextField source="author" />
                    <EditButton />
                    <DeleteButton mutationMode="false"/>
                </Datagrid>
            )}
        </List>
    );
}

export const BlogEdit = props => (
    <Edit title={<BlogTitle />} {...props}> 
        <SimpleForm>
        <TextInput disabled source="id" />
            <TextInput source="title" />
            <TextInput source="author" />
        </SimpleForm>
    </Edit>
);

export const BlogCreate = props => (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="title" />
                <TextInput source="author" />
            </SimpleForm>
        </Create>
    );