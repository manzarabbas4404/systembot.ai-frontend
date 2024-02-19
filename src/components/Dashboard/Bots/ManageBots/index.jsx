"use client";
import Link from "next/link";
import HeaderDashboard from "../../HeaderDashboard";
import LeftSide from "../../LeftSide";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import api_variables from "@/Redux/api_variables";
import Cookies from "js-cookie";
import { getMyBots, getMySingleEditBots } from "@/Redux/Actions/BotActions";
import { DeleteSingleFaq } from "@/Redux/Actions/GHLActions";

// ai_type
// agency_name
// description
// prompt_type
// prompt_name
// intro_msg_type
// intro_msg
// openai_key
// gpt_model
// convesation_limit
// msg_delay
// tz_reference
// tz_format
// time_format

const ManageBots = () => {
  const router = useRouter();
  const params = useSearchParams()
  const [pageLoading, setPageLoading] = useState(false)

  const [botData, setBotData] = useState({
    prompt_type: "Custom Field",
    intro_msg_type: "Custom Field",
    goals: [],
  });


  const handleChange = (e) => {
    let { name, value } = e.target;
    setBotData({ ...botData, [name]: value });
  };

  const handleChangeBotGoals = (e, goal_i) => {
    let goal = botData.goals[goal_i];
    if (goal) {
      let { name, value } = e.target;
      goal = { ...goal, [name]: value };
      setBotData((prev) => ({ ...prev, goals: prev.goals?.map((g, i) => i == goal_i ? goal : g) }))
    }
  };

  const handleChangeBotGoalsHeaders = (e, goal_i, h_i) => {
    let goal = botData.goals[goal_i];
    if (goal) {
      let headers = goal.headers || []
      let head = headers[h_i]
      if (head) {
        let { name, value } = e.target;
        head[name] = value
        goal.headers = headers
        setBotData((prev) => ({ ...prev, goals: prev.goals?.map((g, i) => i == goal_i ? goal : g) }))
      }
    }
  };

  console.log(botData)

  const handleSubmit = () => {
    let isEdit = params.get('isEdit')
    let id = params.get('id')
    let tid = toast.loading("Please wait...");
    if (isEdit) {
      fetch(
        `${api_variables.BASE_URL}/bot/update_bot/${id}/`,
        {
          body: JSON.stringify(botData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${Cookies.get('auth_token')}`
          },
          method: 'PUT'
        }
      ).then(response => {
        return response.json()
      })
        .then(result => {
          toast.success(result?.message || "Bot Updated", { id: tid });
          router.push('/dashboard/bots/')
        })
        .catch(err => {
          toast.error(err?.message || "Something went wrong", { id: tid });
        })
    }
    else {
      fetch(
        `${api_variables.BASE_URL}/bot/create_bot/`,
        {
          body: JSON.stringify(botData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${Cookies.get('auth_token')}`
          },
          method: 'POST'
        }
      ).then(response => {
        return response.json()
      })
        .then(result => {
          toast.success(result?.message || "Bot created", { id: tid });
          router.push('/dashboard/bots/')

        })
        .catch(err => {
          toast.error(err?.message || "Something went wrong", { id: tid });
        })
    }
  };

  useEffect(() => {
    let isEdit = params.get('isEdit')
    if (isEdit) {
      setPageLoading(true)
      let id = params.get('id')
      getMySingleEditBots(
        { id: id },
        (response) => {
          console.log(response)
          setPageLoading(false)
          setBotData({
            ...botData,
            ...response
          })
        },
        (error) => {
          toast.error(error?.message || 'Something went wrong')
          router.push('/dashboard/bots/')
        }
      )
    }
  }, [])
  return (
    <>
      {
        pageLoading &&
        <div className="flex items-center justify-center fixed inset-0 bg-black/50 z-[10]">
          Loading...
        </div>
      }
      <main className="flex">
        <LeftSide />
        <div className="flex-1 ">
          <HeaderDashboard title="Bots" />
          <div className=" p-[24px] bg-slate-100 min-h-[100vh] w-full ">
            <div className="rounded-[10px] bg-[#ffffff] shadow-sm px-[36px] border py-[16px] max-w-[1500px] mx-auto ">
              <h2 className="text-[18px] text-slate-600 font-[600] ">
                {params?.get('isEdit') ? 'Update' : 'Create'} Bot
              </h2>
              <div className="mt-[24px] flex items-center gap-[11px] w-full ">
                <div className="flex-1 ">
                  <label className="text-[12px] text-[#304d83] font-[700]">
                    AI Type
                  </label>
                  <select
                    className="w-full text-[15px] border rounded-[6px] outline-none px-[8px] py-[8px] text-slate-400 mt-[6px] "
                    name="ai_type"
                    onChange={handleChange}
                  >
                    <option selected value="" disabled>
                      Select
                    </option>
                    <option selected={botData?.ai_type == 'Booking' ? true : false} value="Booking">Booking</option>
                    <option selected={botData?.ai_type == 'NonBooking' ? true : false} value="NonBooking">Non Booking</option>
                  </select>
                </div>
                <div className="flex-1 ">
                  <label className="text-[12px] text-[#304d83] font-[700]">
                    Bot Name
                  </label>
                  <input
                    placeholder="Bot Name"
                    name="agency_name"
                    onChange={handleChange}
                    value={botData?.agency_name}
                    className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                    type="text"
                  />
                </div>
              </div>
              <div className="mt-[15px] w-full ">
                <label className="text-[12px] text-[#304d83] font-[700]">
                  Bot Description
                </label>
                <textarea
                  className="w-full h-[120px] border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                  placeholder="Bot Description"
                  name="description"
                  onChange={handleChange}
                  id="description"
                  cols="30"
                  rows="10"
                  value={botData?.description}
                ></textarea>
              </div>
              <div className="mt-[15px] flex items-center gap-[11px] w-full ">
                <div className="flex-1 ">
                  <label className="text-[12px] text-[#304d83] font-[700]">
                    Prompt Type
                  </label>
                  <select
                    className="w-full text-[15px] border rounded-[6px] outline-none px-[8px] py-[8px] text-slate-400 mt-[6px] "
                    name="prompt_type"
                    onChange={handleChange}
                    id="prompt_type"
                  >
                    <option
                      selected={botData?.prompt_type == "Text" ? true : false}
                      value="Text"
                    >
                      Text
                    </option>
                    <option
                      selected={
                        botData?.prompt_type == "Custom Field" ? true : false
                      }
                      value="Custom Field"
                    >
                      Custom Field
                    </option>
                    <option
                      selected={
                        botData?.prompt_type == "Custom Value" ? true : false
                      }
                      value="Custom Value"
                    >
                      Custom Value
                    </option>
                  </select>
                </div>
                <div className="flex-1 ">
                  <label className="text-[12px] text-[#304d83] font-[700]">
                    Enter{" "}
                    {botData?.prompt_type == "Text"
                      ? "Prompt Text"
                      : `${botData?.prompt_type} Name`}
                  </label>
                  <input
                    placeholder="OpenAI Prompt"
                    name="prompt_name"
                    onChange={handleChange}
                    className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                    type="text"
                    value={botData?.prompt_name}
                  />
                </div>
              </div>
              <div className="mt-[15px] flex items-center gap-[11px] w-full ">
                <div className="flex-1 ">
                  <label className="text-[12px] text-[#304d83] font-[700]">
                    Intro Message Type
                  </label>
                  <select
                    className="w-full text-[15px] border rounded-[6px] outline-none px-[8px] py-[8px] text-slate-400 mt-[6px] "
                    name="intro_msg_type"
                    id="intro_msg_type"
                    onChange={handleChange}
                  >
                    <option
                      selected={
                        botData?.intro_msg_type == "Text" ? true : false
                      }
                      value="Text"
                    >
                      Text
                    </option>
                    <option
                      selected={
                        botData?.intro_msg_type == "Custom Field" ? true : false
                      }
                      value="Custom Field"
                    >
                      Custom Field
                    </option>
                    <option
                      selected={
                        botData?.intro_msg_type == "Custom Value" ? true : false
                      }
                      value="Custom Value"
                    >
                      Custom Value
                    </option>
                  </select>
                </div>
                <div className="flex-1 ">
                  <label className="text-[12px] text-[#304d83] font-[700]">
                    Intro Message {`${botData?.intro_msg_type} Name`}
                  </label>
                  <input
                    placeholder="Intro Message"
                    name="intro_msg"
                    onChange={handleChange}
                    className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                    type="text"
                    value={botData?.intro_msg}
                  />
                </div>
              </div>
              <div className="flex items-center gap-[11px] mt-[15px] w-full ">
                <div className="flex-1 flex items-center gap-[9px] ">
                  <div className="flex-1 ">
                    <label className="text-[12px] text-[#304d83] font-[700]">
                      OpenAI API Key
                    </label>
                    <input
                      placeholder={(params.get('isEdit') && botData?.openai_key) ? `${botData?.openai_key?.slice(0,4)}*****************************${botData?.openai_key?.slice(botData?.openai_key?.length - 2 , botData?.openai_key?.length)}` : "OpenAI Key" }
                      name="openai_key"
                      onChange={handleChange}
                      className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                      type="text"
                      // value={botData?.openai_key}
                    />
                  </div>
                  <div className="max-w-max">
                    <label className="text-[12px] text-[#304d83] font-[700]">
                      GPT Model
                    </label>
                    <select
                      className="w-full text-[15px] border rounded-[6px] outline-none px-[8px] py-[8px] text-slate-400 mt-[6px]"
                      name="gpt_model"
                      onChange={handleChange}
                      id="gpt_model"
                    >
                      <option
                        selected={botData?.gpt_model == "GPT_3" ? true : false}
                        value="GPT_3"
                      >
                        GPT 3
                      </option>
                      <option
                        selected={
                          botData?.gpt_model == "GPT_3_5" ? true : false
                        }
                        value="GPT_3_5"
                      >
                        GPT 3.5
                      </option>
                      <option
                        selected={botData?.gpt_model == "GPT_4" ? true : false}
                        value="GPT_4"
                      >
                        GPT 4
                      </option>
                      <option
                        selected={
                          botData?.gpt_model == "GPT_4_turbo" ? true : false
                        }
                        value="GPT_4_turbo"
                      >
                        GPT 4 Turbo
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex-1 flex items-center gap-[9px] ">
                  <div className="flex-1 ">
                    <label className="text-[12px] text-[#304d83] font-[700]">
                      Conversation Limit
                    </label>
                    <input
                      placeholder="Bot Conversation limit"
                      name="convesation_limit"
                      onChange={handleChange}
                      className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                      type="number"
                      value={botData?.convesation_limit}
                    />
                  </div>
                  <div className="flex-1 ">
                    <label className="text-[12px] text-[#304d83] font-[700]">
                      Message Waiting Delay (seconds)
                    </label>
                    <input
                      placeholder="Waiting Delay"
                      name="msg_delay"
                      onChange={handleChange}
                      className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                      type="number"
                      value={botData?.msg_delay}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-[15px] mt-[15px] w-full ">
                <div className="flex-1 flex items-center gap-[9px] ">
                  <div className="flex-1 ">
                    <label className="text-[12px] text-[#304d83] font-[700]">
                      Time Zone Reference
                    </label>
                    <select
                      className="w-full text-[15px] border rounded-[6px] outline-none px-[8px] py-[8px] text-slate-400 mt-[6px] "
                      name="tz_reference"
                      onChange={handleChange}
                    >
                      <option value="" disabled selected>
                        Select
                      </option>
                      <option selected={botData?.tz_reference == 'Contact' ? true : false} value="Contact">Contact</option>
                      <option selected={botData?.tz_reference == 'Location' ? true : false} value="Location">Location</option>
                    </select>
                  </div>
                  <div className="flex-1 ">
                    <label className="text-[12px] text-[#304d83] font-[700]">
                      Timezone Format
                    </label>
                    <select
                      className="w-full text-[15px] border rounded-[6px] outline-none px-[8px] py-[8px] text-slate-400 mt-[6px] "
                      name="tz_format"
                      onChange={handleChange}
                    >
                      <option selected value="" disabled>
                        Select
                      </option>
                      <option selected={botData?.tz_format == 'Abbreviated' ? true : false} value="Abbreviated">Abbreviated</option>
                      <option selected={botData?.tz_format == 'Hidden' ? true : false} value="Hidden">Hidden</option>
                    </select>
                  </div>
                  <div className="flex-1 ">
                    <label className="text-[12px] text-[#304d83] font-[700]">
                      Time Format
                    </label>
                    <select
                      className="w-full text-[15px] border rounded-[6px] outline-none px-[8px] py-[8px] text-slate-400 mt-[6px] "
                      name="time_format"
                      onChange={handleChange}
                    >
                      <option selected value="" disabled>
                        Select
                      </option>
                      <option selected={botData?.time_format == '12 H' ? true : false} value="12 H">12 H</option>
                      <option selected={botData?.time_format == '24 H' ? true : false} value="24 H">24 H</option>
                    </select>
                  </div>
                </div>
                <div className="flex-1 ">
                  <div className="text-[#0037FE] relative gap-[6px] group text-[15px] max-w-max font-[500] hover:text-[#ffffff] hover:bg-[#0037FE] transition-all rounded-[10px] px-[47px] py-[9px] cursor-pointer border-[#0037FE] border flex items-center justify-center ">
                    + Add a Goal
                    <i class="fa-solid fa-angle-up group-hover:rotate-180 transition-all "></i>
                    <div className="pt-[10px] w-full absolute top-[36px] hidden group-hover:block ">
                      <div className="bg-[#ffffff] py-[8px] max-h-[150px] shadow-light h-full overflow-auto rounded-[8px] ">
                        <div
                          onClick={() => {
                            setBotData({
                              ...botData,
                              goals: [...botData?.goals, { goal_type: "Tag" }],
                            });
                          }}
                          className="px-[8px] text-[14px] py-[5px] text-slate-500 hover:text-[#0037FE]/80 hover:bg-[#0037FE]/50 transition-all cursor-pointer "
                        >
                          Tag Type
                        </div>
                        <div
                          onClick={() => {
                            setBotData({
                              ...botData,
                              goals: [
                                ...botData?.goals,
                                { goal_type: "Custom Field" },
                              ],
                            });
                          }}
                          className="px-[8px] text-[14px] py-[5px] text-slate-500 hover:text-[#0037FE]/80 hover:bg-blue-100/50 transition-all cursor-pointer "
                        >
                          Custom Field Type
                        </div>
                        <div
                          onClick={() => {
                            setBotData({
                              ...botData,
                              goals: [
                                ...botData?.goals,
                                { goal_type: "Trigger Webhook" },
                              ],
                            });
                          }}
                          className="px-[8px] text-[14px] py-[5px] text-slate-500 hover:text-[#0037FE]/80 hover:bg-blue-100/50 transition-all cursor-pointer "
                        >
                          Trigger Webhook
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {botData?.goals?.length > 0 ? (
                <div className="mt-4">
                  {botData?.goals?.map((goal, goal_i) => {
                    return (
                      <div className="border rounded-2xl border-[#0037FE] mb-4 px-4 py-3">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 ">
                            <label className="text-[12px] text-[#304d83] font-[700]">
                              {
                                goal?.goal_type == 'Custom Field' ?
                                  'Custom Field Key'
                                  :
                                  <>{goal?.goal_type} Name</>
                              }
                            </label>
                            <input
                              placeholder={goal?.goal_type == 'Custom Field' ? 'Custom Field Key' : `${goal?.goal_type} Name`}
                              name="name"
                              className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                              type="text"
                              value={goal?.name}
                              onChange={(e) => {
                                handleChangeBotGoals(e, goal_i);
                              }}
                            />
                          </div>
                          <div className="flex-1 ">
                            <label className="text-[12px] text-[#304d83] font-[700]">
                              Goal Description
                            </label>
                            <textarea
                              className="w-full h-[70px] border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                              placeholder="Goal Description"
                              name="description"
                              onChange={(e) => {
                                handleChangeBotGoals(e, goal_i);
                              }}
                              cols="30"
                              rows="4"
                              value={goal?.description}
                            ></textarea>
                          </div>
                        </div>
                        {goal?.goal_type == "Custom Field" ? (
                          <div className="flex items-center gap-3">
                            <div className="flex-1 ">
                              <label className="text-[12px] text-[#304d83] font-[700]">
                                Field Type
                              </label>
                              <select
                                className="w-full text-[15px] border rounded-[6px] outline-none px-[8px] py-[8px] text-slate-400 mt-[6px] "
                                name="field_type"
                                onChange={(e) => {
                                  handleChangeBotGoals(e, goal_i);
                                }}
                              >
                                <option selected={goal?.field_type == 'Text' ? true : false} value="Text">Text</option>
                                <option selected={goal?.field_type == 'Number' ? true : false} value="Number">Number</option>
                                <option selected={goal?.field_type == 'Date' ? true : false} value="Date">Date</option>
                                <option selected={goal?.field_type == 'Contact Full Name' ? true : false} value="Contact Full Name">Contact Full Name</option>
                                <option selected={goal?.field_type == 'Contact Date of Birth' ? true : false} value="Contact Date of Birth">Contact Date of Birth</option>
                                <option selected={goal?.field_type == 'Contact Email' ? true : false} value="Contact Email">Contact Email</option>
                                <option selected={goal?.field_type == 'Contact Address' ? true : false} value="Contact Address">Contact Address</option>
                                <option selected={goal?.field_type == 'Contact Business Name' ? true : false} value="Contact Business Name">Contact Business Name</option>
                                <option selected={goal?.field_type == 'Contact Timezone' ? true : false} value="Contact Timezone">Contact Timezone</option>
                                <option selected={goal?.field_type == 'Phone' ? true : false} value="Phone">Phone</option>
                                <option selected={goal?.field_type == 'Email' ? true : false} value="Email">Email</option>
                              </select>
                            </div>
                            <div className="flex-1 flex items-center gap-2 justify-start ">
                              <input
                                id="allow_overrite"
                                name="allow_overrite"
                                className="border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                                type="checkbox"
                                onChange={(e) => {
                                  handleChangeBotGoals(e, goal_i);
                                }}
                                checked={goal?.allow_overrite}
                              />
                              <label
                                htmlFor="allow_overrite"
                                className="text-[12px] text-[#304d83] font-[700]"
                              >
                                Allow Overwrite
                              </label>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        {goal?.goal_type == "Trigger Webhook" ? (
                          <>
                            <div className="flex items-center gap-3">
                              <div className="flex-1 ">
                                <label className="text-[12px] text-[#304d83] font-[700]">
                                  Triggers
                                </label>
                                <select
                                  className="w-full text-[15px] border rounded-[6px] outline-none px-[8px] py-[8px] text-slate-400 mt-[6px] "
                                  name="trigger"
                                  onChange={(e) => {
                                    handleChangeBotGoals(e, goal_i);
                                  }}
                                >
                                  <option selected={goal?.trigger == 'Once' ? true : false} value="Once">Once Only</option>
                                  <option selected={goal?.trigger == 'Multiple' ? true : false} value="Multiple">Multiple Times</option>
                                </select>
                              </div>
                              <div className="flex-1 ">
                                <label className="text-[12px] text-[#304d83] font-[700]">
                                  Webhook URL
                                </label>
                                <input
                                  value={goal?.webhook_url}
                                  placeholder={`Webhook URL`}
                                  name="webhook_url"
                                  className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                                  type="text"
                                  onChange={(e) => {
                                    handleChangeBotGoals(e, goal_i);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex-1 ">
                                <label className="text-[12px] text-[#304d83] font-[700]">
                                  Webhook Request Method
                                </label>
                                <select
                                  className="w-full text-[15px] border rounded-[6px] outline-none px-[8px] py-[8px] text-slate-400 mt-[6px] "
                                  name="webhook_method"
                                  onChange={(e) => {
                                    handleChangeBotGoals(e, goal_i);
                                  }}
                                >
                                  <option selected={goal?.webhook_method == 'GET' ? true : false} value="GET">GET</option>
                                  <option selected={goal?.webhook_method == 'POST' ? true : false} value="POST">POST</option>
                                </select>
                              </div>

                              <span className="flex-1"></span>
                            </div>
                            <div
                              className="px-4 py-2 rounded-lg border border-[#0037FE] max-w-max mt-3 hover:bg-[#0037FE] text-[#0037FE] font-[500] cursor-pointer hover:text-white"
                              onClick={() => {
                                let hds = goal?.headers || []
                                handleChangeBotGoals({ target: { name: 'headers', value: [...hds, {}] } }, goal_i);
                              }}
                            >
                              Add Headers
                            </div>
                            {
                              goal?.headers?.map((header, h_i) => {
                                return (
                                  <>
                                    <div className="flex items-center justify-between gap-3">
                                      <div className="flex-1 ">
                                        <label className="text-[12px] text-[#304d83] font-[700]">
                                          Headers
                                        </label>
                                        <input
                                          value={header?.name}
                                          placeholder={`Authorization`}
                                          name="name"
                                          className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                                          type="text"
                                          onChange={(e) => {
                                            handleChangeBotGoalsHeaders(e, goal_i, h_i);
                                          }}
                                        />
                                      </div>
                                      <div className="flex-1 ">
                                        <label className="text-[12px] text-[#304d83] font-[700]">
                                          Value of Header
                                        </label>
                                        <input
                                          value={header?.value}
                                          placeholder={`Value of Header`}
                                          name="value"
                                          className="w-full border px-[12px] py-[8px] mt-[6px] text-[14px] text-slate-700 outline-none rounded-[6px] "
                                          type="text"
                                          onChange={(e) => {
                                            handleChangeBotGoalsHeaders(e, goal_i, h_i);
                                          }}
                                        />
                                      </div>
                                      <div
                                        className="border cursor-pointer rounded-md mt-3 w-[30px] h-[30px] flex items-center justify-center"
                                        onClick={() => {
                                          setBotData({
                                            ...botData,
                                            goals: [
                                              ...botData?.goals?.map((itm, i) => goal_i != i ? itm : { ...itm, headers: [...itm.headers?.filter((hd, hd_i) => hd_i != h_i)] })
                                            ]
                                          })
                                        }}
                                      >
                                        <i class="text-sm opacity-50 fa fa-trash" aria-hidden="true"></i>
                                      </div>
                                    </div>
                                  </>
                                )
                              })
                            }
                          </>
                        ) : (
                          <></>
                        )}
                        <div
                          className="border cursor-pointer rounded-md mt-3 w-[30px] h-[30px] flex items-center justify-center"
                          onClick={() => {
                            setBotData({
                              ...botData,
                              goals: [
                                ...botData?.goals?.filter((itm, i) => goal_i != i)
                              ]
                            })
                          }}
                        >
                          <i class="text-sm opacity-50 fa fa-trash" aria-hidden="true"></i>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
              <div className="flex items-center gap-[8px] mt-[22px] ">
                <Link
                  href={`/dashboard/bots`}
                  className="rounded-[8px] w-[140px] flex items-center justify-center text-[15px] font-[600] px-[30px] py-[8px] border border-[#0037FE] hover:bg-[#0037FE] transition-all text-[#0037FE] hover:text-[#ffffff] "
                >
                  Cancel
                </Link>
                <button
                  className="rounded-[8px] w-[140px] text-[15px] font-[600] px-[30px] py-[8px] border border-[#0037FE] bg-[#0037FE] hover:bg-green-700/90 hover:border-green-700/90 transition-all text-[#ffffff] "
                  onClick={handleSubmit}
                >
                  {params?.get('isEdit') ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ManageBots;
