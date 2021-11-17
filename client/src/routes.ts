import { ReactElement } from 'react';
import AnotherContent from './components/AnotherContent';
import MainContent from './components/MainContent';
import SInterviewList from './components/SInterviewList';

import Login from './components/Login';
import Profile from './components/Profile';
import CreateInterviewForm from './components/CreateInterview';
import Attending from './components/Attending';
import Candidates from './components/Candidates';
import CandidateProfile from './components/CandidateProfile';
import InterviewList from './components/InterviewList';
interface RouteType {
    show: boolean;
    path: string;
    name: string;
    icon: string;
    component: ({}) => ReactElement;
    comp?: string;
    layout: string;
    type?: 'student' | 'interviewer'; //this will be decided from server side graphql
}

const routes: RouteType[] = [
    {
        show: true,
        path: '/interviews',
        name: 'Interviews[stud]',
        icon: 'ni ni-bullet-list-67 text-red',
        component: SInterviewList,
        layout: '/admin',
        comp: '/student',
    },
    {
        show: true,
        path: '/create',
        name: 'Create Interview',
        icon: 'ni ni-bullet-list-67 text-red',
        component: CreateInterviewForm,
        layout: '/admin',
        comp: '/interviewer',
    },
    {
        show: true,
        path: '/list',
        name: 'Attending',
        icon: 'ni ni-bullet-list-67 text-red',
        component: Attending,
        layout: '/admin',
        comp: '/student',
    },
    {
        show: true,
        path: '/profile',
        name: 'Profile',
        icon: 'ni ni-bullet-list-67 text-red',
        component: Profile,
        layout: '/admin',
        comp: '/student',
    },
    // it is not show in sidebar because it is used as preview only
    // may be we can use this component in modal also so that we  dont have to render page
    {
        show: false,
        path: '/candidate',
        name: 'Candidate Profile',
        icon: 'ni ni-bullet-list-67 text-red',
        component: CandidateProfile,
        layout: '/admin',
        comp: '/student',
    },
    {
        show: true,
        path: '/candidates',
        name: 'Candidates',
        icon: 'ni ni-bullet-list-67 text-red',
        component: Candidates,
        layout: '/admin',
        comp: '/interviewer',
    },
    {
        show: true,
        path: '/history',
        name: 'Created Interviews',
        icon: 'ni ni-bullet-list-67 text-red',
        component: InterviewList,
        layout: '/admin',
        comp: '/interviewer',
    },
    //   {
    //     show: true,
    //     path: '/responses',
    //     param: '/:responseId?',
    //     name: 'Responses',
    //     icon: 'ni ni-bullet-list-67 text-red',
    //     component: Responses,
    //     comp: '/admin',
    //   },
    //   {
    //     path: '/form/:formId',
    //     name: 'PublicForm',
    //     icon: 'ni ni-bullet-list-67 text-red',
    //     component: PublicForm,
    //     comp: '/public',
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
