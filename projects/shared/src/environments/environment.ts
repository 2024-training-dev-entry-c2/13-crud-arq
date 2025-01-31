export const environment = {
  apiUrl: 'https://6622071827fcd16fa6c8818c.mockapi.io/api/v1'
};

export const urlResources = {
  blogs: `${environment.apiUrl}/blogs`,
  blogsOperationsById: (blogId: string) => `${environment.apiUrl}/blogs/${blogId}`
}