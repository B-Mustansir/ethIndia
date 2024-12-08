from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper

from langchain_openai import AzureChatOpenAI
import os

os.environ["OPENAI_API_VERSION"] = "2024-08-01-preview"
os.environ["AZURE_OPENAI_ENDPOINT"] = "https://edictai-openai-bot.openai.azure.com/"
os.environ["AZURE_OPENAI_API_KEY"] = "9462cddff37a473fbce5d2ffe9e6682f"

# Initialize LLM
llm = llm = AzureChatOpenAI(
    azure_deployment="editai-gpt-4o",  # or your deployment
    api_version="2024-08-01-preview",  # or your api version
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    # other params...
)

# Initialize CDP wrapper
cdp = CdpAgentkitWrapper(cdp_api_key_name="organizations/2bdc26b0-0f28-4ea3-b834-e2b89db6bd14/apiKeys/2ff954de-68bc-4046-be63-bf009c642d3c",
cdp_api_key_private_key="-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIELzRn1eJBe+XaoKWzB3qO13g8d6KBbCETHp5NckWAK/oAoGCCqGSM49\nAwEHoUQDQgAEgzZkcZ5GfH21THhcb9ZMCZPSTlTbXnWelyolKA1a74dbVAM2lUBl\nny74jxsoFzvu9PuGNpdNONQ2s7a5KQhlbQ==\n-----END EC PRIVATE KEY-----\n"
)

# Create toolkit from wrapper
toolkit = CdpToolkit.from_cdp_agentkit_wrapper(cdp)
# Get tools and create agent
tools = toolkit.get_tools()
agent_executor = create_react_agent(llm, tools)

# print(tools)

# Example usage
events = agent_executor.stream(
    {"messages": [("user", "tell me a joke")]},
    stream_mode="values"
)

for event in events:
    event["messages"][-1].pretty_print()