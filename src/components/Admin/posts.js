import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    DeleteButton,
    Edit,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    SimpleList
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
}



export const PostList = (props) => {
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
                    <NumberField source="blogId" />
                    <TextField source="title" />
                    <TextField source="body" />
                    <DeleteButton mutationMode="false"/>
                </Datagrid>
            )}
        </List>
    );
}

export const PostEdit = props => (
    <Edit title={<PostTitle />} {...props}> 
        <SimpleForm>
        <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users">
            <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
);
