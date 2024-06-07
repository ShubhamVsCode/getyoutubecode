# Get Code from Youtube

### Finally we got this from a youtube video

```typescript
export const POST = async (req: NextRequest) => {
  const { data, format } = genericSchema.parse(body)

  // step 2: create a schema from the expected user format
  const dynamicSchema = jsonSchemaToZod(format)

  // step 3: retry mechanism
  type PromiseExecutor = (resolve: () => void) => void

  class RetryablePromise<T> extends Promise<T> {
    static async retry(
      retries: number,
      executor: PromiseExecutor
    ) {

    }
  }
```
