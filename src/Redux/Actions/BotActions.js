import Cookies from "js-cookie"
import api_variables from "../api_variables"


export const getMyBots = (data, success, fail) => {
    fetch(`${api_variables.BASE_URL}${api_variables.get_my_bots}`,
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

export const getMySingleEditBots = (data, success, fail) => {
    let status_code = undefined
    fetch(`${api_variables.BASE_URL}${api_variables.get_single_bot}${data?.id}/`,
        {
            headers: { Authorization: `Token ${Cookies.get('auth_token')}` },
        }
    )
        .then(response => {
            status_code = response.status
            return response.json()
        })
        .then(result => {
            console.log(status_code)
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

export const deleteMyBot = (data, success, fail) => {
    fetch(`${api_variables.BASE_URL}${api_variables.delete_bot}${data?.id}/`,
        {
            headers: { Authorization: `Token ${Cookies.get('auth_token')}` },
            method : 'DELETE'
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

export const cloneMyBot = (data, success, fail) => {
    fetch(`${api_variables.BASE_URL}${api_variables.clone_bot}${data?.id}/`,
        {
            headers: { Authorization: `Token ${Cookies.get('auth_token')}` },
            method : 'POST'
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



export const sendBotMessage = (data, success, fail) => {
    fetch(`${api_variables.BASE_URL}${api_variables.send_message}${data?.agency_id}/${data?.location_id}/${data?.contact_id}/`,
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                'message': data.message,
                'botId' : data?.botId
            })
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

export const resetBotSimulation = (data, success, fail) => {
    fetch(`${api_variables.BASE_URL}${api_variables.reset_simulation}${data?.contact_id}/`,
        {
            method: 'DELETE',
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