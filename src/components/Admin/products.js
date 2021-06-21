import * as React from "react";


import { List,
     Datagrid,
      TextField, 
      Create,
       Edit,
        TextInput,
        SelectInput,
        NumberInput,
        EditButton,
        DeleteButton,
        Pagination,
    SimpleForm} from 'react-admin';

    const PostPagination = props => <Pagination rowsPerPageOptions={[5, 10]} {...props} />;

export const ProductList = props => (
    <List {...props} pagination={<PostPagination />}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="price" />
            <TextField source="rating" />
            <TextField source="title" />
            <TextField source="description" />
            <EditButton />
            <DeleteButton mutationMode="false"/>
        </Datagrid>
    </List>
);

export const ProductCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" />
            
            <SelectInput source="hardware" choices={[
                { id: 'true', name: 'True' },
                { id: 'false', name: 'False' },
            ]} />
            <TextInput source="image" />
            <NumberInput source="onsale" />
            <NumberInput source="price" />
            <NumberInput source="rating" />
             
        </SimpleForm>
    </Create>
);

const ProductTitle = ({ record }) => {
    return <span>Product: {record ? `"${record.title}"` : ''}</span>;
}
export const ProductEdit = props => (
    <Edit title={<ProductTitle />} {...props}> 
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="onsale" />
            <TextInput multiline source="description" />
            <TextInput source="image" />
            <TextInput source="price" />
            <TextInput source="rating" />
            <SelectInput source="hardware" choices={[
                { id: 'true', name: 'True' },
                { id: 'false', name: 'False' },
            ]} /> 

        </SimpleForm>
    </Edit>
);