
import type { TCourse, TSemester } from '../../../types/courseManagement.types';
import type { TQueryParam, TResponseRedux } from '../../../types/global';
import { baseApi } from '../../api/baseApi';

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRegisteredSemesters: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/semester-registrations',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ['semester'],
            transformResponse: (response: TResponseRedux<TSemester[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        addRegisteredSemester: builder.mutation({
            query: (data) => ({
                url: '/semester-registrations/create-semester-registration',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['semester'],
        }),
        updateRegisteredSemester: builder.mutation({
            query: (args) => ({
                url: `/semester-registrations/${args.id}`,
                method: 'PATCH',
                body: args.data,
            }),
            invalidatesTags: ['semester'],
        }),
        getAllOfferedCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/courses',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ['semester'],
            transformResponse: (response: TResponseRedux<TSemester[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
       
        updateOfferedCourse: builder.mutation({
            query: (args) => ({
                url: `/courses/${args.id}`,
                method: 'PATCH',
                body: args.data,
            }),
            invalidatesTags: ['semester'],
        }),
        getAllCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/courses',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ['courses'],
            transformResponse: (response: TResponseRedux<TCourse[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        addCourse: builder.mutation({
            query: (data) => ({
                url: `/courses/create-course`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['courses'],
        }),
        addFaculties: builder.mutation({
            query: (args) => ({
                url: `/courses/${args.courseId}/assign-faculties`,
                method: 'PUT',
                body: args.data,
            }),
            invalidatesTags: ['courses'],
        }),
         getCourseFaculties: builder.query({
      query: (id) => {
        return {
          url: `/courses/${id}/get-faculties`,
          method: 'GET',
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createOfferedCourse: builder.mutation({
      query: (data) => ({
        url: `offered-courses/create-offered-course`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['courses'],
    }),
    }),
});

export const {
    useAddRegisteredSemesterMutation,
    useGetAllRegisteredSemestersQuery,
    useUpdateRegisteredSemesterMutation,
    useGetAllCoursesQuery,
    useAddCourseMutation,
    useAddFacultiesMutation,
    useGetAllOfferedCoursesQuery,
    useCreateOfferedCourseMutation,
    useUpdateOfferedCourseMutation,
    useGetCourseFacultiesQuery,
} = courseManagementApi;