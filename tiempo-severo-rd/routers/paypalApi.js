let BASE_URL = 'https://api-m.sandbox.paypal.com';
const base64 = require('base-64');
const { Header } = require('react-native/Libraries/NewAppScreen');

let clientID = 'AfTslJzDpOFDQ5WQpLjXcQbBjaa06dZZ_qbgng4eN8Oj2FJvg4LDdOVf4wSWTU3b7MesXz41RxocttCH';
let clientSecretKey = 'EKb2WqbxS0naVAAAwzaYFO4SVmryaPEKljpnUNfH7aI-IDXrN82fDXS_E2n8WDEbZOP56Z_5c--WgGwr';


let orderDetail = {
    "intent": "CAPTURE",
    "purchase_units": [
        {
            "items": [
                {
                    "name": "T-Shirt",
                    "description": "Green XL",
                    "quantity": "1",
                    "unit_amount": {
                        "currency_code": "USD",
                        "value": "100.00"
                    }
                }
            ],
            "amount": {
                "currency_code": "USD",
                "value": "100.00",
                "breakdown": {
                    "item_total": {
                        "currency_code": "USD",
                        "value": "100.00"
                    }
                }
            }
        }
    ],
    "application_context": {
        "return_url": "https://www.google.com/",
        "cancel_url": "https://www.youtube.com/"
    }
}

const generateToken = () => {
    let END_POINT = '/v1/oauth2/token';
    var headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Basic " + base64.encode(`${clientID}:${clientSecretKey}`));

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: 'grant_type=client_credentials',
    };

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + END_POINT, requestOptions).then(response => response.text()).then(result => {
            // console.log("Result of API fetch : ", result);
            let {access_token} = JSON.parse(result);
            resolve(access_token);
        }).catch(error => {
            console.log("Error fetching api : ", error);
            reject(error);
        })
    });
}

const createOrder = (token = '') => {
    let END_POINT = '/v2/checkout/orders';

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderDetail),
    };

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + END_POINT, requestOptions).then(response => response.text()).then(result => {
            // console.log("Result of API fetch : ", result);
            let res = JSON.parse(result);
            resolve(res);
        }).catch(error => {
            console.log("Error fetching api : ", error);
            reject(error);
        })
    });
}

const capturePayment = (id, token = '') => {
    let END_POINT = `/v2/checkout/orders/${id}/capture`;

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },   
    };

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + END_POINT, requestOptions).then(response => response.text()).then(result => {
            // console.log("Result of API fetch : ", result);
            let res = JSON.parse(result);
            resolve(res);
        }).catch(error => {
            console.log("Error fetching api : ", error);
            reject(error);
        })
    });
}

const createProduct = (token = '', name='') => {
    let END_POINT = "/v1/catalogs/products";

    let productDetail = {
        "name": `${name}`,
        "description": `Severe weather forecasting for ${name}. Rain Shower Posibilities, Thunderstorm Posibilities, Significant Raifall Risk, Hazardous Storms Risk, and Wind Gust Risk.` ,
        "type": "DIGITAL",
        "category": "SOFTWARE",
        // "image_url": "https://example.com/gallary/images/{{$timestamp}}.jpg",
        // "home_url": "https://example.com/catalog/{{$timestamp}}.jpg"
    }

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productDetail),
    };

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + END_POINT, requestOptions).then(response => response.text()).then(result => {
            // console.log("Result of API fetch : ", result);
            let res = JSON.parse(result);
            resolve(res);
        }).catch(error => {
            console.log("Error fetching api : ", error);
            reject(error);
        })
    });
}

const createPlan = (token = '', productId = '', planName = '', planPrice) => {
    let END_POINT = "/v1/billing/plans";   
    
    let planDetails = {
        "product_id": `${productId}`,
        "name": `${planName}`,
        "description": `Severe weather forecasting for ${planName}.`,
        "status": "ACTIVE",
        "billing_cycles": [
            {
                "frequency": {
                    "interval_unit": "MONTH",
                    "interval_count": 1
                },
                "tenure_type": "REGULAR",
                "sequence": 1,
                "total_cycles": 12,
                "pricing_scheme": {
                    "fixed_price": {
                        "value": `${planPrice}`,
                        "currency_code": "USD"
                    }
                }
            }
        ],
        "payment_preferences": {
            "auto_bill_outstanding": true,
            "setup_fee_failure_action": "CONTINUE",
            "payment_failure_threshold": 3
        },
        "taxes": {
            "percentage": "10",
            "inclusive": false
        }
    }

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(planDetails),
    };

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + END_POINT, requestOptions).then(response => response.text()).then(result => {
            // console.log("Result of API fetch : ", result);
            let res = JSON.parse(result);
            resolve(res);
        }).catch(error => {
            console.log("Error fetching api : ", error);
            reject(error);
        })
    });
}

const createSubscription = (token = '', planId = '') => {
    let END_POINT = "/v1/billing/subscriptions";  
    
    let subscriptionDetail = {
        "plan_id": `${planId}`,
        "subscriber": {
            "name": {
                "given_name": "FooBuyer",
                "surname": "Jones"
            },
            "email_address": "foobuyer@example.com"
        },
        "application_context": {
            "brand_name": "Tiempo Severo RD",
            "locale": "en-US",
            "user_action": "SUBSCRIBE_NOW",
            "payment_method": {
                "payer_selected": "PAYPAL",
                "payee_preferred": "IMMEDIATE_PAYMENT_REQUIRED"
            },
            "return_url": "https://example.com/return",
            "cancel_url": "https://example.com/cancel"
        }
    }

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(subscriptionDetail),
    };

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + END_POINT, requestOptions).then(response => response.text()).then(result => {
            // console.log("Result of API fetch : ", result);
            let res = JSON.parse(result);
            resolve(res);
        }).catch(error => {
            console.log("Error fetching api : ", error);
            reject(error);
        })
    });
}   

export default {
    generateToken,
    createOrder,
    capturePayment,
    createProduct,
    createPlan,
    createSubscription
}