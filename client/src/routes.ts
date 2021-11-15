import { ReactElement } from 'react';
import AnotherContent from './components/AnotherContent';
import MainContent from './components/MainContent';
import SInterviewList from './components/SInterviewList';

import Login from './components/Login';
import Profile from './components/Profile';
import CreateInterviewForm from './components/CreateInterview';
interface RouteType {
    show: boolean;
    path: string;
    name: string;
    icon: string;
    component: ({}) => ReactElement;
    layout: string;
    type?: 'student' | 'interviewer'; //this will be decided from server side graphql
}

const routes: RouteType[] = [
    {
        show: true,
        path: '/forms',
        name: 'Interviews',
        icon: 'ni ni-bullet-list-67 text-red',
        component: SInterviewList,
        layout: '/admin',
    },
    {
        show: true,
        path: '/create',
        name: 'Create Form',
        icon: 'ni ni-bullet-list-67 text-red',
        component: CreateInterviewForm,
        layout: '/admin',
    },
    {
        show: true,
        path: '/list',
        name: 'Attending',
        icon: 'ni ni-bullet-list-67 text-red',
        component: SInterviewList,
        layout: '/admin',
    },
    {
        show: true,
        path: '/profile',
        name: 'Profile',
        icon: 'ni ni-bullet-list-67 text-red',
        component: Profile,
        layout: '/admin',
    },
    {
        show: true,
        path: '/new',
        name: 'Create Interview',
        icon: 'ni ni-bullet-list-67 text-red',
        component: AnotherContent,
        layout: '/admin',
    },
    {
        show: true,
        path: '/interviewies',
        name: 'Interviewies',
        icon: 'ni ni-bullet-list-67 text-red',
        component: AnotherContent,
        layout: '/admin',
    },
    {
        show: true,
        path: '/create',
        name: 'Created Interviews',
        icon: 'ni ni-bullet-list-67 text-red',
        component: AnotherContent,
        layout: '/admin',
    },
    //   {
    //     show: true,
    //     path: '/responses',
    //     param: '/:responseId?',
    //     name: 'Responses',
    //     icon: 'ni ni-bullet-list-67 text-red',
    //     component: Responses,
    //     layout: '/admin',
    //   },
    //   {
    //     path: '/form/:formId',
    //     name: 'PublicForm',
    //     icon: 'ni ni-bullet-list-67 text-red',
    //     component: PublicForm,
    //     layout: '/public',
    //   },
    {
        show: false,
        path: '/login',
        name: 'Login',
        icon: 'ni ni-key-25 text-info',
        component: Login,
        layout: '/auth',
    },
];
export { routes, RouteType };
