

export default {
    // BASE_URL : 'http://localhost:8000',
    BASE_URL : 'https://backend.systembot.ai',
    get_my_bots : '/bot/get_my_bots/',
    get_single_bot : '/bot/get_single_bot/',
    delete_bot : '/bot/delete_bot/',
    clone_bot : '/bot/clone_bot/',
    send_message : '/bot/send_message/',
    reset_simulation : '/bot/reset_simulation/',

    get_audit_logs : '/logs/get_audit_logs/',

    get_user_ghl_account : '/ghl/get_user_ghl_account/',
    get_agency_sub_accounts : '/ghl/get_agency_sub_accounts/',
    update_ghl_account : '/ghl/update_ghl_account/',
    update_openai_key : '/ghl/update_openai_key/',
    update_agency_sub_account : '/ghl/update_agency_sub_account/',
    disable_enable_subaccount : '/ghl/disable_enable_subaccount/',
    refersh_sub_accounts : '/ghl/refersh_sub_accounts/',
    
    get_faqs : '/faq/get_faqs/',
    clear_faqs : '/faq/clear_faqs/',
    import_faqs : '/faq/import_faqs/',
    scrapt_urls : '/faq/scrapt_urls/',
    delete_faq : '/faq/delete_faq/',
    add_faq : '/faq/add_faq/',
}