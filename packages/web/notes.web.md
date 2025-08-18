```
const { data, isLoading, error } = useQuery(
trpc.health.queryOptions({ name: "asd" }, { retry: 3 })
);
const { mutateAsync: postHealthCheck } = useMutation(
trpc.healthPost.mutationOptions()
);
```

<script>
      (function() {
        var convofyConfig = {
          botId: '3e9e2aef-4518-41c3-a5b2-2100982fcb56',
        };
        
        var script = document.createElement('script');
        script.src = 'http://localhost:5173/dist/widget/widget.iife.js'; // Replace with your widget URL
        script.async = true;
        script.onload = function() {
          window.ConvofyWidget.init(convofyConfig);
        };
        document.head.appendChild(script);
      })();
    </script>
