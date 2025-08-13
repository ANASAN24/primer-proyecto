import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProfileComponent } from './pages/profile/profile.component';
import { PostsWall } from './pages/postWall/posts-wall';
import { PlayArea } from './pages/playArea/playArea.component';
import { Publish } from './pages/publish/publish.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: 'login',
        component: Login,
    },
    {
        path: '',
        component: Layout,
        children: [
        {
            path:'dashboard',
            component:Dashboard,
        },
        {
            path:'profile',
            component:ProfileComponent,
        },
        {
            path: 'postwall',
            component:PostsWall,
        },
        {
            path: 'playArea',
            component:PlayArea,
        },
                {
            path: 'publish',
            component:Publish,
        },
    ]
    },

];
