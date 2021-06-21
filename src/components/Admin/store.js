import * as React from "react";

import {
  List,
  Datagrid,
  TextField,
  Edit,
  DeleteButton,
  EditButton,
  SimpleForm,
  TextInput
} from "react-admin";


export const StoreDetailsList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="storeName" />
      <TextField source="storeAddress" />
      <TextField source="phoneNumber" />
      <TextField source="storeEmail" />
      <EditButton/>
      <DeleteButton mutationMode="false"/>
    </Datagrid>
  </List>
);


export const StoreDetailsEdit = props => (
  <Edit {...props}>
    <SimpleForm>
        <TextInput source="storeName" />
        <TextInput source="storeAddress" />
        <TextInput source="phoneNumber" />
        <TextInput source="storeEmail" />
        <TextInput source="storePic" />
    </SimpleForm>
  </Edit>
);

