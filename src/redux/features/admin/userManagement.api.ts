import { type TQueryParam, type TResponseRedux } from '../../../types/global';
import type { TAdmin, TFaculty, TStudent } from '../../../types/userManagement.types';

import { baseApi } from '../../api/baseApi';

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/students',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
      getSingleStudent: builder.query({
  query: (id) => ({
    url: `/students/${id}`,
    method: 'GET',
        }),
      transformResponse: (response: TResponseRedux<TStudent>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
        }
      }),
  
    addStudent: builder.mutation({
      query: (data) => ({
        url: '/users/create-student',
        method: 'POST',
        body: data,
      }),
    }),
    getAllAdmins: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/admins',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
      getSingleAdmin: builder.query({
  query: (id) => ({
    url: `/admins/${id}`,
    method: 'GET',
        }),
      transformResponse: (response: TResponseRedux<TAdmin>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
        }
      }),
  
    addAdmin: builder.mutation({
      query: (data) => ({
        url: '/users/create-admin',
        method: 'POST',
        body: data,
      }),
    }),
    getAllFaculties: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/faculties',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
      getSingleFaculty: builder.query({
  query: (id) => ({
    url: `/faculties/${id}`,
    method: 'GET',
        }),
      transformResponse: (response: TResponseRedux<TFaculty>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
        }
      }),
  
    addFaculty: builder.mutation({
      query: (data) => ({
        url: '/users/create-faculty',
        method: 'POST',
        body: data,
      }),
    }),
     changePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useAddStudentMutation, useGetAllStudentsQuery, useGetSingleStudentQuery,useAddAdminMutation,useGetAllAdminsQuery,useGetSingleAdminQuery,useAddFacultyMutation,useGetAllFacultiesQuery,useGetSingleFacultyQuery, useChangePasswordMutation } =
  userManagementApi;