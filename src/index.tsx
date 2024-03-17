import ReactDOM from 'react-dom'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
// import Helmet from 'react-helmet'
// Apps
// import {Helmet} from 'react-helmet'
import {hydrate} from 'react-dom'
import {Helmet, HelmetProvider} from 'react-helmet-async'
import {render} from 'react-snapshot'

import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'
/**
 * TIP: Replace this style import with dark styles to enable dark mode
 *
 * import '  ./_metronic/assets/sass/style.dark.scss'
 *
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/style.react.scss'
import {AppRoutes} from './app/routing/AppRoutes'
import {AuthProvider, setupAxios} from './app/modules/auth'
import {Provider} from 'react-redux'
import {userReducer} from './store'
import {configureStore} from '@reduxjs/toolkit'

// import { Provider } from 'react-intl/src/components/injectIntl'
const store = configureStore({
  reducer: userReducer,
})
// const helmet = Helmet.renderStatic()

/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */

/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios)

Chart.register(...registerables)

const queryClient = new QueryClient()

hydrate(
  <QueryClientProvider client={queryClient}>
    <MetronicI18nProvider>
      <Provider store={store}>
        <AuthProvider>
          <HelmetProvider>
            <AppRoutes />
          </HelmetProvider>
        </AuthProvider>
      </Provider>
    </MetronicI18nProvider>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider>,
  document.getElementById('root')
)

// const helmet = Helmet.renderStatic()
// console.log('title', helmet.title.toString())
// console.log('meta', helmet.meta.toString())
// console.log('link', helmet.link.toString())
