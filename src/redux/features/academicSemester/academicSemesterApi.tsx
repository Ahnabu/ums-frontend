import { baseApi } from "../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemesters: builder.query({
            query: () => ({
                url: "/academic-semesters",
                method: "GET",
            }),
            // providesTags: ["AcademicSemester"],
        }),
        getSemesterById: builder.query({
            query: (id) => ({
                url: `/academic-semester/${id}`,
                method: "GET",
            }),
            // providesTags: ["AcademicSemester"],
        }),
        createSemester: builder.mutation({
            query: (data) => ({
                url: "/academic-semester",
                method: "POST",
                body: data,
            }),
            // invalidatesTags: ["AcademicSemester"],
        }),
        updateSemester: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/academic-semester/${id}`,
                method: "PATCH",
                body: data,
            }),
            // invalidatesTags: ["AcademicSemester"],
        }),
        deleteSemester: builder.mutation({
            query: (id) => ({
                url: `/academic-semester/${id}`,
                method: "DELETE",
            }),
            // invalidatesTags: ["AcademicSemester"],
        }),
    }),
})


export const {
    useGetAllSemestersQuery,
    useGetSemesterByIdQuery,
    useCreateSemesterMutation,
    useUpdateSemesterMutation,
    useDeleteSemesterMutation,
} = academicSemesterApi;