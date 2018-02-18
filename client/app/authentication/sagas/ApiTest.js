// import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
// import { delay } from 'redux-saga';
// import * as AuthenticationSources from '../sources';
// import { currentAccessToken } from '../selector';
//
//
// export function* Test() {
//   try {
//     while (true) {
//       yield delay(500, true);
//       let accessToken = yield select(currentAccessToken);
//       if (accessToken) {
//         console.log('---ApiTest start');
//         yield call(AuthenticationSources.test);
//         console.log('---ApiTest finished');
//       }
//     }
//   } catch(e) {
//     console.log(e);
//   }
// }
//
// export default Test;
