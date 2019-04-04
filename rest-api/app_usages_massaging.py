import requests
import datetime

d = {}

f = '%Y-%m-%d %H:%M:%S'
URL = "http://localhost:8081/app_state_changes"

r = requests.get(URL)

data = r.json()

#print(data)

template_dict=  {"min":1000000,"max":-1000000,'total':0,'count':0,'start_time':None,'current_state':None}

for obj in data:
    obj["timestamp"] = datetime.datetime.strptime(obj['timestamp'].replace('T',' ')[:-5], f)

#print(data[0])
#print(datetime.datetime.strptime(data[0]['timestamp'].replace('T',' ')[:-5], f))
#print(data[0]['timestamp']-data[1]['timestamp'])

data = sorted(data,key = lambda i: i['timestamp'])
#for o in data:
#    print(o['timestamp'])

#print(data)
current_resumed = None
for obj in data:
    application_id = obj['application_id']
    vehicle_id = obj['vehicle_id']
    event_name = obj['event_name']
    timestamp = obj['timestamp']
    if (application_id,vehicle_id) not in d:
        d[(application_id,vehicle_id)] = template_dict.copy()
    curr = d[(application_id,vehicle_id)]
    # if curr['eventName'].lower() == 'resumed':
    #     pass

for i in d:
    print(i)
