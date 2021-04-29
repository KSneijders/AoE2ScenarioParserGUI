import json
import subprocess
import sys

import pkg_resources

required = {'aoe2scenarioparser'}
installed = {pkg.key for pkg in pkg_resources.working_set}
missing = required - installed

lines = []
result = {
    'code': -1,
    'message': ''
}

lines.append("Checking requirements...")

if missing:
    lines.append(f"Installing: {missing}.")
    python = sys.executable
    subprocess.check_call([python, '-m', 'pip', 'install', *missing], stdout=subprocess.DEVNULL)

    lines.append("All requirements were successfully installed.")
    result['code'] = 1
else:
    lines.append("All requirements already satisfied.")
    result['code'] = 2

result['message'] = '\n'.join(lines)
print(json.dumps(result))
