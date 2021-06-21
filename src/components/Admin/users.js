import * as React from "react";
import {SelectInput, List, Create, TextInput, Datagrid, TextField, EmailField,Edit, SimpleForm,EditButton, DeleteButton } from 'react-admin';
import MyUserField from './MyUserField';
// import {auth,db} from "../../firebase"

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <TextField source="role" />
            <MyUserField source="activity" />
            <EditButton />
            <DeleteButton mutationMode="false"/>
        </Datagrid>
    </List>
);
const UserTitle = ({ record }) => {
    return <span>User {record ? `"${record.name}"` : ''}</span>;
}
export const UserEdit = props => (
    <Edit title={<UserTitle />} {...props}> 
        <SimpleForm>
        <SelectInput source="activity" choices={[
                { id: 'Active', name: 'Active' },
                { id: 'Not Active', name: 'Not Active' },
            ]} /> 
        <SelectInput source="role" choices={[
                { id: 'User', name: 'User' },
                { id: 'Owner', name: 'Shop Owner' },
                { id: 'Admin', name: 'Admin' },
            ]} /> 
        </SimpleForm>
    </Edit>
);


export const UserCreate = props =>{
    // const redirect = useRedirect();
    // const notify = useNotify();

    return (
    <Create {...props} >
        <SimpleForm >
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="password" />
        <SelectInput source="role" choices={[
                { id: 'User', name: 'User' },
                { id: 'Owner', name: 'Shop Owner' },
                { id: 'Admin', name: 'Admin' },
            ]} /> 
        </SimpleForm>
    </Create>
)};