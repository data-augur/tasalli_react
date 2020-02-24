import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {DashboardConfig} from 'app/main/dashboard/DashboardConfig';
import {BrandUsersLoginConfig} from 'app/main/login/LoginConfig';
import {LoginConfig} from 'app/main/super-login/LoginConfig';
import {RegisterConfig} from 'app/main/register/RegisterConfig';
import {Error404PageConfig} from 'app/main/errors/Error404PageConfig';
import {BrandUsersAppConfig} from 'app/main/brand-users/BrandUserAppConfig';
import {AdminUsersAppConfig} from 'app/main/admin-users/AdminUserAppConfig';
import {AdsAppConfig} from 'app/main/ads/AdsAppConfig';
import {BannerAdsAppConfig} from 'app/main/banner-ads/BannerAdsAppConfig';
import {PopUpsAppConfig} from 'app/main/popup/PopupsAppConfig';
import {SurveysAppConfig} from 'app/main/surveys/SurveysAppConfig';
import {SurveyAttributeAppConfig} from 'app/main/surveyAttribute/SurveyAttributeAppConfig';
import {WarrantyRegistrationAttributeAppConfig} from 'app/main/warrantyRegistrationAttribute/WarrantyRegistrationAttributeAppConfig';
import {WarrantyClaimAttributeAppConfig} from 'app/main/warrantyClaimAttribute/WarrantyClaimAttributeAppConfig';
import {ProductsAppConfig} from 'app/main/products/ProductsAppConfig';
import {WarrantyRegistrationAppConfig} from 'app/main/warranty-registration/WarrantyRegistrationAppConfig';
import {WarrantyClaimAppConfig} from 'app/main/warranty-claim/WarrantyClaimAppConfig';
import {WarrantyCompletionAppConfig} from 'app/main/warranty-completion/WarrantyCompletionAppConfig';
import {AppUsersAppConfig} from 'app/main/app-users/AppUserAppConfig';
import {CompaniesAppConfig} from 'app/main/company/CompaniesAppConfig';
import {NotificationsAppConfig} from 'app/main/notifications/NotificationsAppConfig';
import {LogsAppConfig} from 'app/main/logs/LogsAppConfig';
import {RetailersAppConfig} from 'app/main/retailers/RetailersAppConfig';
import {QrCodesAppConfig} from 'app/main/qr-codes/QrCodesAppConfig';
import {WarrantyRegisterAppConfig} from 'app/main/warranty-register/WarrantyRegisterAppConfig';
import {WarrantyClaimedAppConfig} from 'app/main/warranty-claimed/WarrantyClaimedAppConfig';
import {BrandsAppConfig} from 'app/main/brands/BrandsAppConfig';
import {UploadPicturesAppConfig} from 'app/main/upload-picture/UploadPictureAppConfig';
import {LogoutConfig} from 'app/main/logout/LogoutConfig';

const routeConfigs = [
    DashboardConfig,
    BrandUsersLoginConfig,
    LoginConfig,
    RegisterConfig,
    AppUsersAppConfig,
    AdminUsersAppConfig,
    AdsAppConfig,
    BannerAdsAppConfig,
    PopUpsAppConfig,
    SurveysAppConfig,
    SurveyAttributeAppConfig,
    WarrantyRegistrationAttributeAppConfig,
    WarrantyClaimAttributeAppConfig,
    ProductsAppConfig,
    BrandUsersAppConfig,
    BrandsAppConfig,
    CompaniesAppConfig,
    NotificationsAppConfig,
    WarrantyRegistrationAppConfig,
    WarrantyClaimAppConfig,
    WarrantyCompletionAppConfig,
    LogsAppConfig,
    RetailersAppConfig,
    QrCodesAppConfig,
    WarrantyRegisterAppConfig,
    WarrantyClaimedAppConfig,
    UploadPicturesAppConfig,
    LogoutConfig,
    Error404PageConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/login"/>
    },
    {
        path: '/su-admin/',
        exact: true,
        component: () => <Redirect to="/su-admin/login"/>
    },
    {
        path: '/dashboard/',
        exact: true,
        component: () => <Redirect to="/dashboard"/>
    },
    {
        component: () => <Redirect to="/404"/>
    }
    // {
    //   path: '/dashboard',
    //   component: () => <Redirect to="/dashboard" />
    // }
];
export default routes;
