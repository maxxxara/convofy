function App() {
const { data, isLoading, error } = useQuery(
trpc.health.queryOptions({ name: "asd" }, { retry: 3 })
);
const { mutateAsync: postHealthCheck } = useMutation(
trpc.healthPost.mutationOptions()
);
useEffect(() => {
console.log("data", data);
}, [data]);

return (
<div>
<div>{data?.status}</div>
<button
onClick={() => {
postHealthCheck({ name: "vdfvfd" }).then((res) => {
console.log("res", res);
});
}} >
Post
</button>
</div>
);
}
