import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        sclass: sclassReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these paths in the state
                ignoredPaths: [
                    'user.error',
                    'student.error',
                    'teacher.error',
                    'notice.error',
                    'complain.error',
                    'sclass.error'
                ],
                // Ignore these action types
                ignoredActions: [
                    'user/authError',
                    'student/getError',
                    'teacher/getError',
                    'notice/getError',
                    'complain/getError',
                    'sclass/getError'
                ],
            },
        }),
});

export default store;
