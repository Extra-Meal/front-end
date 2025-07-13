import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useGetData } from "@/hooks/useApi";

type Cat = {
  _id: string;
  name: string;
};

type Area = {
  _id: string;
  name: string;
};

type Ingredient = {
  _id: string;
  name: string;
  measure: string;
};

export default function ProductForm() {
  const [visible, setVisible] = useState(true);
  const cat = useGetData("/category");
  const a = useGetData("/areas");
  const [ingredients, setIngredients] = useState([{ ingredient: "", measure: "" }]);
  const addIngredient = () => {
    setIngredients([...ingredients, { ingredient: "", measure: "" }]);
  };
  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const baseSelectStyle =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label className="text-muted-foreground mb-1 block text-sm font-medium">Product Name</Label>
          <Input placeholder="e.g. Chicken Meal" />
        </div>

        <div>
          <Label className="text-muted-foreground mb-1 block text-sm font-medium">Price ($)</Label>
          <Input type="number" step="0.01" placeholder="e.g. 12.99" />
        </div>

        <div>
          <Label className="text-muted-foreground mb-1 block text-sm font-medium">Stock</Label>
          <Input type="number" placeholder="e.g. 50" />
        </div>

        <div>
          <Label className="text-muted-foreground mb-1 block text-sm font-medium">Image URL</Label>
          <Input type="url" placeholder="https://example.com/image.jpg" />
        </div>

        <div>
          <Label className="text-muted-foreground mb-1 block text-sm font-medium">Type</Label>
          <select className={baseSelectStyle}>
            <option selected disabled value="kit">
              Kit
            </option>
          </select>
        </div>

        <div>
          <Label className="text-muted-foreground mb-1 block text-sm font-medium">Discount (%)</Label>
          <Input type="number" placeholder="e.g. 10" />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Label className="text-muted-foreground mb-1 text-sm font-medium">Visible</Label>
          <Switch checked={visible} onCheckedChange={() => setVisible(!visible)} />
        </div>
      </div>

      {visible && (
        <div className="bg-background rounded-2xl border p-6 shadow-sm">
          <h3 className="text-foreground mb-4 text-lg font-semibold">Meal Info</h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label className="text-muted-foreground mb-1 block text-sm font-medium">Meal Name</Label>
              <Input placeholder="e.g. Grilled Chicken" />
            </div>

            <div>
              <Label className="text-muted-foreground mb-1 block text-sm font-medium">Category</Label>
              <select className={baseSelectStyle}>
                <option value="">Select Category</option>
                {cat.data?.data.map((c: Cat) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="text-muted-foreground mb-1 block text-sm font-medium">Area</Label>
              <select className={baseSelectStyle}>
                <option value="">Select Area</option>
                {a.data?.data.map((area: Area) => (
                  <option key={area._id} value={area._id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="text-muted-foreground mb-1 block text-sm font-medium">Thumbnail URL</Label>
              <Input type="url" placeholder="https://example.com/thumb.jpg" />
            </div>

            <div>
              <Label className="text-muted-foreground mb-1 block text-sm font-medium">Youtube URL</Label>
              <Input type="url" placeholder="https://youtube.com/..." />
            </div>

            <div>
              <Label className="text-muted-foreground mb-1 block text-sm font-medium">Source URL</Label>
              <Input type="url" placeholder="https://example.com/recipe" />
            </div>

            <div>
              <Label className="text-muted-foreground mb-1 block text-sm font-medium">Preparation Time (min)</Label>
              <Input type="number" placeholder="e.g. 30" />
            </div>

            <div>
              <Label className="text-muted-foreground mb-1 block text-sm font-medium">Difficulty</Label>
              <select className={baseSelectStyle}>
                <option value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <Label className="text-muted-foreground mb-1 block text-sm font-medium">Instructions</Label>
              <Textarea placeholder="Write instructions..." />
            </div>

            <div className="sm:col-span-2">
              <Label className="text-muted-foreground mb-1 block text-sm font-medium">Tags (comma-separated)</Label>
              <Input placeholder="e.g. spicy, gluten-free, dinner" />
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-muted-foreground mb-3 text-sm font-medium">Ingredients</h4>

            {ingredients.map((_, index) => (
              <div key={index} className="mb-3 flex flex-wrap items-center gap-2">
                <Input placeholder="Ingredient" className="flex-1" />
                <Input placeholder="Measure" className="flex-1" />
                <Button type="button" variant="destructive" size="icon" onClick={() => removeIngredient(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 flex items-center gap-1"
              onClick={addIngredient}
            >
              <Plus className="h-4 w-4" />
              Add Ingredient
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
