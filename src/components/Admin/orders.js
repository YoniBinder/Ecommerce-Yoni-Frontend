import * as React from "react";

import {
  List,
  Datagrid,
  TextField,
  Edit,
  DeleteButton,
  NumberField,
  EditButton,
  SimpleForm,
  SelectInput,
  ArrayField
} from "react-admin";

// const FullAddressField = ({record = {} }) => <span>{record.address.city}, {record.address.street} {record.address.house_number}</span>;
// FullAddressField.defaultProps = { label: 'Address',source: "address"};


export const OrderList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="createdAt" />
      <NumberField source="reference" />
      <TextField source="userId" />
      {/* <FullAddressField /> */}
    <ArrayField source="products">
        <Datagrid>
            <TextField source="title" />
            <TextField source="item" />
        </Datagrid>
    </ArrayField>
      <NumberField source="total" />
      <TextField source="status" />
      <EditButton/>
      <DeleteButton mutationMode="false"/>
    </Datagrid>
  </List>
);


export const OrderEdit = props => (
  <Edit {...props}>
    <SimpleForm>
        <SelectInput source="status" choices={[
                { id: 'Order Recieved', name: 'Order Recieved' },
                { id: 'In progress', name: 'In progress' },
                { id: 'Approved', name: 'Approved' },
                { id: 'Sent to customer', name: 'Sent to customer' },
                { id: 'Order complete', name: 'Order complete' },
            ]} /> 
    </SimpleForm>
  </Edit>
);

