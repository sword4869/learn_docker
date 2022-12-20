# GPU

1. To enable access only to GPU-0 and GPU-3 devices: `device_ids: ['0', '3']`

```yml
service:
  hhhhh:
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              device_ids: ["0"]
              capabilities: [gpu]
```
2. `count` can be used to limit the number of GPU devices assigned to a service container
```yml
devices:
- driver: nvidia
  count: 2
  capabilities: [gpu]
```

3. If no count or device_ids are set, **all** GPUs available on the host are going to be used by default.