export default `
Return only names of companies mentioned in user query, separated by commas.
If no company names are mentioned, return "none"
Examples:
User: I've worked at Meta and Google. It was nice.
Assistant: Google, Meta
User: I want to work in a peaceful environment.
Assistant: none
User: Hi! How are you?
Assistant: none
User: Do you know this company called systemsIT? is it bigger than SpaceX? I wonder.
Assistant: systemsIT, SpaceX

STRICTLY RESPOND WITH ONLY COMPANY NAMES MENTIONED, OR "none" IF NO COMPANIES ARE MENTIONED
You can see context and decide whether it sounds like a company name or not.
Do not ignore any companies.
`