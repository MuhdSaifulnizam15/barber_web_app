// ----------------------------------------------------------------------

const path = (root, sublink) => {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    register: path(ROOTS_AUTH, '/register'),
    resetPassword: path(ROOTS_AUTH, '/reset-password'),
    forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
    verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
    comingSoon: '/coming-soon',
    // maintenance: '/maintenance',
    page404: '/404',
    // page500: '/500',
    // about: '/about-us',
    // contact: '/contact-us',
    // faqs: '/faqs',

    settings: '/settings',
    sales: '/sales',
    transaction: '/transactions',
    history: '/transactions',
};

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    service: {
        root: path(ROOTS_DASHBOARD, '/services'),
        list: path(ROOTS_DASHBOARD, '/services/list'),
        newService: path(ROOTS_DASHBOARD, '/services/new'),
        showById: path(ROOTS_DASHBOARD, '/services/detail'),
        editById: path(ROOTS_DASHBOARD, `/services/edit`),
    },
    category: {
        root: path(ROOTS_DASHBOARD, '/category'),
        list: path(ROOTS_DASHBOARD, '/category/list'),
        newCategory: path(ROOTS_DASHBOARD, '/category/new'),
        showById: path(ROOTS_DASHBOARD, '/category/detail'),
        editById: path(ROOTS_DASHBOARD, `/category/edit`),
    },
    user: {
        root: path(ROOTS_DASHBOARD, '/user'),
        list: path(ROOTS_DASHBOARD, '/user/list'),
        newUser: path(ROOTS_DASHBOARD, '/user/new'),
        showById: path(ROOTS_DASHBOARD, '/user/detail'),
        editById: path(ROOTS_DASHBOARD, `/user/edit`),
        profile: path(ROOTS_DASHBOARD, '/user/profile')
    },
    customer: {
        root: path(ROOTS_DASHBOARD, '/customer'),
        list: path(ROOTS_DASHBOARD, '/customer/list'),
        newCustomer: path(ROOTS_DASHBOARD, '/customer/new'),
        showById: path(ROOTS_DASHBOARD, '/customer/detail'),
        editById: path(ROOTS_DASHBOARD, `/customer/edit`)
    },
}
