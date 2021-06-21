import * as React from "react";
import { Admin, Resource} from 'react-admin';
import { ProductList,ProductCreate,ProductEdit } from './products'
import { UserList, UserCreate, UserEdit} from './users'
import { PostList,PostEdit} from './posts';
import { BlogList,BlogEdit, BlogCreate } from './blogs';
import { OrderList,OrderEdit} from './orders';
import { StoreDetailsList,StoreDetailsEdit} from './store';
import { CommentList,CommentEdit} from './comments';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import simpleRestProvider from 'ra-data-simple-rest';
import Dashboard from './Dashboard';


const dataProvider = simpleRestProvider(process.env.REACT_APP_PROXY);


// const config = {
//     apiKey: process.env.REACT_APP_FIREBASE_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//     databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
//   }

// const authProvider = FirebaseAuthProvider(config);

const App = () => (
      <Admin dashboard={Dashboard} dataProvider={dataProvider}>
          <Resource name="posts" list={PostList} edit={PostEdit} icon={PostIcon}/>
          <Resource name="users" list={UserList} icon={UserIcon} create={UserCreate} edit={UserEdit}/>
          <Resource name="products" list={ProductList} edit={ProductEdit} create={ProductCreate}/>
          <Resource name="blogs" list={BlogList} edit={BlogEdit} create={BlogCreate} icon={PostIcon}/>
          <Resource name="orders" list={OrderList} edit={OrderEdit}/>
          <Resource name="details" list={StoreDetailsList} edit={StoreDetailsEdit}/>
          <Resource name="comments" list={CommentList} edit={CommentEdit}/>
     </Admin>
  );
export default App;
