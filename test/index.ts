import Hook from '../index'
const hook = new Hook({ proxy_agent: '188.120.246.158:8930' })

main()
async function main() {
  try {
    let ok = await hook.get('https://vk.com')//('https://api.ipify.org/?format=json') // http://ifconfig.me/all.json
    console.log(ok)

  } catch (err) {
    console.log(err)
  }
}
