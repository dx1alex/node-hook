import Hook from '../index'
const hook = new Hook()

main()
async function main() {
  try {
    let ok = await hook.get('https://api.ipify.org/?format=json') // http://ifconfig.me/all.json
    console.log(ok.body)

  } catch (err) {
    console.log(err)
  }
}
