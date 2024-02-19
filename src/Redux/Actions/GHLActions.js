import Cookies from "js-cookie"
import api_variables from "../api_variables"


export const getMyGHLAccount = (data, success, fail) => {
    fetch(`${api_variables.BASE_URL}${api_variables.get_user_ghl_account}`,
        {
            headers: { Authorization: `Token ${Cookies.get('auth_token')}` },
        }
    )
        .then(response => {
            return response.json()
        })
        .then(result => {
            success && success(result)
        })
        .catch(err => {
            fail && fail(err)
        })
}

export const getMyFAQs = (data, success, fail) => {
    fetch(`${api_variables.BASE_URL}${api_variables.get_faqs}${data?.agency_id}/${data?.location_id}/${data?.contact_id ? `${data?.contact_id}/` : ''}`,)
        .then(response => {
            return response.json()
        })
        .then(result => {
            success && success(result)
        })
        .catch(err => {
            fail && fail(err)
        })
}

export const ClearMyFaqs = (data, success, fail) => {
    fetch(`${api_variables.BASE_URL}${api_variables.clear_faqs}${data?.location_id}/`, { method: 'DELETE', headers: { Authorization: `Token ${Cookies.get('auth_token')}` } })
        .then(response => {
            return response.json()
        })
        .then(result => {
            success && success(result)
        })
        .catch(err => {
            fail && fail(err)
        })
}

export const ImportFile = (data, success, fail) => {
    let form_data = new FormData()
    form_data.append('file', data?.file)
    let status_code = ''
    fetch(`${api_variables.BASE_URL}${api_variables.import_faqs}${data?.location_id}/`,
        {
            method: 'POST',
            body: form_data,
            headers: {
                Authorization: `Token ${Cookies.get('auth_token')}`
            }
        }
    )
        .then(response => {
            status_code = response.status
            return response.json()
        })
        .then(result => {
            if (status_code == 200) {
                success && success(result)
            }
            else {
                fail && fail(result)
            }
        })
        .catch(err => {
            fail && fail(err)
        })
}

export const DeleteSingleFaq = (data, success, fail) => {
    fetch(`${api_variables.BASE_URL}${api_variables.delete_faq}${data?.id}/`, { method: 'DELETE', headers: { Authorization: `Token ${Cookies.get('auth_token')}` } })
        .then(response => {
            return response.json()
        })
        .then(result => {
            success && success(result)
        })
        .catch(err => {
            fail && fail(err)
        })
}

export const getMyGHLAccountSubAccounts = (data, success, fail) => {
    fetch(`${api_variables.BASE_URL}${api_variables.get_agency_sub_accounts}`,
        {
            headers: { Authorization: `Token ${Cookies.get('auth_token')}` },
        }
    )
        .then(response => {
            return response.json()
        })
        .then(result => {
            success && success(result)
        })
        .catch(err => {
            fail && fail(err)
        })
}

export const getSubAccountAuditLogs = (data, success, fail) => {
    fetch(`${api_variables.BASE_URL}${api_variables.get_audit_logs}${data?.id}/`,
        {
            headers: { Authorization: `Token ${Cookies.get('auth_token')}` },
        }
    )
        .then(response => {
            return response.json()
        })
        .then(result => {
            success && success(result)
        })
        .catch(err => {
            fail && fail(err)
        })
}

export const UpdateMyGhlAccount = (data, success, fail) => {
    fetch(`${api_variables.BASE_URL}${api_variables.update_ghl_account}`,
        {
            headers: { Authorization: `Token ${Cookies.get('auth_token')}`, 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(data)
        },
    )
        .then(response => {
            return response.json()
        })
        .then(result => {
            success && success(result)
        })
        .catch(err => {
            fail && fail(err)
        })
}

export const UpdateGhlAccountOpenAiKey = (data, success, fail) => {
    fetch(`${api_variables.BASE_URL}${api_variables.update_openai_key}`,
        {
            headers: { Authorization: `Token ${Cookies.get('auth_token')}`, 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(data)
        },
    )
        .then(response => {
            return response.json()
        })
        .then(result => {
            success && success(result)
        })
        .catch(err => {
            fail && fail(err)
        })
}

export const UpdateGHLSubAccount = (data, success, fail) => {
    fetch(`${api_variables.BASE_URL}${api_variables.update_agency_sub_account}${data?.account_id}/`,
        {
            headers: { Authorization: `Token ${Cookies.get('auth_token')}`, 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(data)
        },
    )
        .then(response => {
            return response.json()
        })
        .then(result => {
            success && success(result)
        })
        .catch(err => {
            fail && fail(err)
        })
}

export const UpdateGHLSubAccountMultipleEnable = (data, success, fail) => {
    let form_data = new FormData()
    data?.ids.forEach(id => {
        console.log(id)
        form_data.append('ids', id)
    })
    if (data?.enable) {
        form_data.append('enable', true)
    }
    fetch(`${api_variables.BASE_URL}${api_variables.disable_enable_subaccount}`,
        {
            headers: { Authorization: `Token ${Cookies.get('auth_token')}` },
            method: 'PUT',
            body: form_data
        },
    )
        .then(response => {
            return response.json()
        })
        .then(result => {
            success && success(result)
        })
        .catch(err => {
            fail && fail(err)
        })
}

export const RefreshGhlAccountSubAccounts = (data, success, fail) => {
    fetch(`${api_variables.BASE_URL}${api_variables.refersh_sub_accounts}`,
        {
            headers: { Authorization: `Token ${Cookies.get('auth_token')}`, },
            method: 'PUT',
        },
    )
        .then(response => {
            return response.json()
        })
        .then(result => {
            success && success(result)
        })
        .catch(err => {
            fail && fail(err)
        })
}

export const AddFaqHandler = (data, success, fail) => {
    fetch(`${api_variables.BASE_URL}${api_variables.add_faq}${data?.sub_account}/`,
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        },
    )
        .then(response => {
            return response.json()
        })
        .then(result => {
            success && success(result)
        })
        .catch(err => {
            fail && fail(err)
        })
}

export const ScrapeURl = (data, success, fail) => {
    fetch(`${api_variables.BASE_URL}${api_variables.scrapt_urls}${data?.sub_account}/`,
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        },
    )
        .then(response => {
            return response.json()
        })
        .then(result => {
            success && success(result)
        })
        .catch(err => {
            fail && fail(err)
        })
}