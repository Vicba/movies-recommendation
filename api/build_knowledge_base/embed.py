import requests
import pandas as pd
import os
from dotenv import load_dotenv
load_dotenv()

api_token = os.environ["HUGGINGFACE_APIKEY"]
print(api_token)

# # Define a function to call the endpoint and obtain embeddings
# def query(texts):
#     model_id = "sentence-transformers/all-MiniLM-L6-v2"
#     hf_token =  os.environ["HUGGINGFACE_APIKEY"]

#     api_url = f"https://api-inference.huggingface.co/pipeline/feature-extraction/{model_id}"
#     headers = {"Authorization": f"Bearer {hf_token}"}

#     response = requests.post(
#         api_url,
#         headers=headers,
#         json={"inputs": texts, "options": {"wait_for_model": True}},
#     )
#     return response.json()


# # Loop through the dataset to generate vectors in batches
# emb_dfs = list()
# src_texts = list()
# df = pd.read_csv("./datasets/movies_data_1990_2024.csv")
# for i, row in enumerate(df.itertuples(index=False)):
#     # Concatenate text to create a source string
#     src_text = "Title" + row.title + "; Overview: " + row.overview
#     # Add to the buffer
#     src_texts.append(src_text)
#     if (len(src_texts) == 50) or (i + 1 == len(df)):  # Get embeddings in batches of 50
#         # Get a batch of embeddings
#         output = query(src_texts)
#         emb_df = pd.DataFrame(output)
#         # Add the batch of embeddings to a list
#         emb_dfs.append(emb_df)
#         # Reset the buffer
#         src_texts = list()


# emb_df = pd.concat(emb_dfs)  # Create a combined dataset

# # Save the data as a CSV
# emb_df.to_csv(
#     f"./datasets/movies_data_1990_2024_embeddings.csv",
#     index=False,
# )